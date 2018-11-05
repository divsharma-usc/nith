import xlrd
import io

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from backend.docapi.serializers import FileSerializer
from backend.subjectapi.models import Subject

# Create your views here.
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def uploadSub(request,format=None):
    
	  if request.method == 'POST':
	    file_obj=request.data['doc']
	    department = request.data['department']
	    semester = request.data['semester']
	    course = request.data['course']
	    file_serializer = FileSerializer(data={'file':file_obj})
	    if file_serializer.is_valid():
	    	#to read data from the uploaded file
	    	Subject.objects.filter(semester=semester,department=department,course=course).delete()
	    	wb = xlrd.open_workbook(file_contents=request.FILES['doc'].read())
	    	for s in wb.sheets():
	    		for row in range(s.nrows):
	    			val=[]
	    			for col in range(s.ncols):
	    				val.append(str(s.cell(row,col).value))
	    			print(','.join(val))
	    			#save changes to database
	    			obj = Subject(semester=semester,department=department,course=course,sub_code=str(val[0]),
	    				sub_name=str(val[1]),L_credits=str(val[2]).split(".")[0],T_credits=str(val[3]).split(".")[0],P_credits=str(val[4]).split(".")[0])
	    			obj.save()
	    		print()
	    	print(request.data)
	    	file_serializer.save()
	    	return Response({'file_obj':file_serializer.data,'msg':'Data uploaded Successfully'}, status=status.HTTP_201_CREATED)
	    else:
	    	return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def getSubs(request,format=None):
	semester = request.data['semester']
	department = request.data['department']
	course = request.data['course']

	sub_obj = Subject.objects.filter(semester=semester,department=department,course=course).values()


	if len(sub_obj) > 0 :

		res_list = []
		res_obj = {}
		for obj in sub_obj:
			res_list.append(obj)
		res_obj['data'] = res_list
		res_obj['length'] = len(res_list)
		return Response(res_obj,status=status.HTTP_200_OK)

	else:

		res_list = []
		res_obj = {}
		res_obj['data'] = res_list
		res_obj['length'] = 0
		return Response(res_obj,status=status.HTTP_200_OK)

