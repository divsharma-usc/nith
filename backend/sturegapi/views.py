from django.utils import timezone
import pytz
import datetime

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from backend.userapi.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

from backend.sturegapi.models import StuReg
from backend.registrationapi.models import StudentRegistered, Reg

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def upload(request,format=None):
    
	  if request.method == 'POST':
	  	#Extract data from the request object
	  	email = request.data['email']
	  	rollno = request.data['rollno']
	  	semester = request.data['semester']
	  	name = request.data['name']
	  	fathername = request.data['fathername']
	  	gender = request.data['gender']
	  	phone = request.data['phone']
	  	hosteler = request.data['hosteler']
	  	parentPhone = request.data['parentPhone']
	  	parentEmail = request.data['parentEmail']
	  	permaAddress = request.data['permanentAddress']
	  	corresAddress = request.data['correspondanceAddress']
	  	d1 = request.data['dob'].split('-')
	  	dob = datetime.datetime(int(d1[0]),int(d1[1]),int(d1[2]),12,0,0 ,tzinfo=pytz.UTC)
	  	try:
	  		reg_obj = Reg.objects.filter().values().first()
	  		StuReg.objects.filter(rollno=rollno).delete()
	  		obj = StuReg(rollno=rollno,name=name,semester=semester,fathername=fathername,gender=gender,phone=phone,hosteler=hosteler,
			  parentPhone=parentPhone,parentEmail=parentEmail,permaAddress=permaAddress,corresAddress=corresAddress,dob=dob)
	  		obj.save()
	  		reg_obj = StudentRegistered(year=reg_obj['year'],semester=reg_obj['semester'],email=email)
	  		reg_obj.save()
	  		return Response({'msg': "Data Saved Successfully"},status=status.HTTP_200_OK)
	  	except Exception as e:
	  		return Response({'msg': "Registration Failed"},status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def getData(request,format=None):
	if request.method == 'POST':
	  	rollno = request.data['rollno']
	  	stu_obj = StuReg.objects.filter(rollno=rollno).values().first()
	  	if len(stu_obj) > 0:
	  		return Response(stu_obj,status=status.HTTP_200_OK)
	  	else:
	  		return Response({'msg':'Record not found'},status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def isStudentRegisterd(request,format=None):
	if request.method == 'POST':
		email = request.data['email']
		reg_obj = Reg.objects.filter().values().first()
		reg_obj = StudentRegistered.objects.filter(year=reg_obj['year'],semester=reg_obj['semester'],email=email)
		if len(reg_obj) > 0 :
			return Response({'isStudentRegisterd':True},status=status.HTTP_200_OK)
		else:
			return Response({'isStudentRegisterd':False},status=status.HTTP_200_OK)

	  		

      


