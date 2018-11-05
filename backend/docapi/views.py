import xlrd
import io

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import FileSerializer, LibraryFineSerializer, HostelFineSerializer
from backend.docapi.models import LibraryFine, HostelFine
from backend.userapi.models import UserProfile

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def upload(request,format=None):
    
	  if request.method == 'POST':
	    file_obj=request.data['doc']
	    year = request.data['year']
	    semester = request.data['semester']
	    file_serializer = FileSerializer(data={'file':file_obj})
	    if file_serializer.is_valid():
	    	#to read data from the uploaded file
	    	LibraryFine.objects.filter(year=year,semester=semester).delete()
	    	wb = xlrd.open_workbook(file_contents=request.FILES['doc'].read())
	    	for s in wb.sheets():
	    		for row in range(s.nrows):
	    			val=[]
	    			for col in range(s.ncols):
	    				val.append(str(int(s.cell(row,col).value)))
	    			print(','.join(val))
	    			#save changes to database
	    			p = LibraryFine(year=year,semester=semester,rollno=val[0].split(".")[0],fine=int(val[1]))
	    			p.save()
	    		print()
	    	print(request.data)
	    	file_serializer.save()
	    	return Response(file_serializer.data, status=status.HTTP_201_CREATED)
	    else:
	    	return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def hostelupload(request,format=None):
    
	  if request.method == 'POST':
	    file_obj=request.data['doc']
	    year = request.data['year']
	    semester = request.data['semester']
	    username = request.data['user']
	    hostel = UserProfile.objects.filter(username=username).values().first()['userdetail']
	    print(username)
	    file_serializer = FileSerializer(data={'file':file_obj})
	    if file_serializer.is_valid():
	    	#to read data from the uploaded file
	    	HostelFine.objects.filter(year=year,semester=semester,hostel=hostel).delete()
	    	wb = xlrd.open_workbook(file_contents=request.FILES['doc'].read())
	    	for s in wb.sheets():
	    		for row in range(s.nrows):
	    			val=[]
	    			for col in range(s.ncols):
	    				val.append(str(int(s.cell(row,col).value)))
	    			print(','.join(val))
	    			#save changes to database
	    			try:
	    				p = HostelFine(year=year,semester=semester,rollno=val[0].split(".")[0],hostel=hostel,fine=int(val[1]))
	    				print(p)
	    				print('**')
	    				p.save()
	    			except Exception as e:
	    				print(e)
	    		print()
	    	print(request.data)
	    	file_serializer.save()
	    	return Response(file_serializer.data, status=status.HTTP_201_CREATED)
	    else:
	    	return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)