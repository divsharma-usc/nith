import xlrd
import io

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from backend.docapi.serializers import FileSerializer
from backend.studentapi.models import Student

# Create your views here.
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def uploaddoc(request,format=None):
    
	  if request.method == 'POST':
	    file_obj=request.data['doc']
	    enrollment_year = request.data['year']
	    department = request.data['department']
	    course = request.data['course']
	    file_serializer = FileSerializer(data={'file':file_obj})
	    res_list = []
	    if file_serializer.is_valid():
	    	#to read data from the uploaded file
	    	Student.objects.filter(enrollment_year=enrollment_year,department=department,course=course).delete()
	    	wb = xlrd.open_workbook(file_contents=request.FILES['doc'].read())
	    	for s in wb.sheets():
	    		for row in range(s.nrows):
	    			val=[]
	    			for col in range(s.ncols):
	    				val.append(str(s.cell(row,col).value))
	    			print(','.join(val))
	    			#save changes to database
	    			b = Student.objects.filter(email=val[1])
	    			if len(b)>0:
	    				res_list.append(b.values().first('rollno'))
	    			else:
	    				p = Student(enrollment_year=enrollment_year,department=department,course=course,rollno=val[0].split(".")[0],email=val[1])
	    				p.save()
	    		print()
	    	print(request.data)
	    	file_serializer.save()
	    	return Response({'file_obj':file_serializer.data,'error_rollno':res_list}, status=status.HTTP_201_CREATED)
	    else:
	    	return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	   

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def getStudentData(request,format=None):
	
	if request.method == 'POST':
		print(request.data)
		email =  request.data['email']
		stu_obj = Student.objects.filter(email=email).values().first()
		
		res_obj = {}
		res_obj['enrollment_year'] = stu_obj['enrollment_year']
		res_obj['department'] = stu_obj['department']
		res_obj['course'] = stu_obj['course']
		res_obj['rollno'] = stu_obj['rollno']
		res_obj['email'] = stu_obj['email']

		return Response(res_obj,status=status.HTTP_200_OK)





