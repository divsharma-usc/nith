from django.utils import timezone
import pytz
import datetime

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from backend.registrationapi.serializers import RegSerializer
from rest_framework.permissions import IsAuthenticated

from backend.registrationapi.models import Reg
from backend.studentapi.models import Student
from backend.docapi.models import LibraryFine, HostelFine

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def checkstatus(request,format=None):
	 if request.method == 'GET':
	 	obj = Reg.objects.filter(status=True)
	 	if len(obj)>0:
	 		return Response({'status':False}, status=status.HTTP_200_OK)
	 	else:
	 		return Response({'status':True}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def getReg(request,format=None):
	if request.method == 'GET':
		obj = Reg.objects.filter(status=True).values().first()
		res_obj = {
	 		'year':obj['year'],
	 		'semester':obj['semester'],
	 		'p1date': obj['p1StartDate'].strftime('%Y-%m-%d'),
	 		'p1enddate' : obj['p1EndDate'].strftime('%Y-%m-%d'),
	 		'p2date': obj['p2StartDate'].strftime('%Y-%m-%d'),
	 		'enddate': obj['endDate'].strftime('%Y-%m-%d'),

	 	}
		return Response(res_obj,status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def newReg(request,format=None):
	if request.method == 'POST':
		print(request.data)
		Reg.objects.filter(status=True).delete()
		regstatus = True
		print(request.data['data']['year'])
		year = request.data['data']['year']
		semester = request.data['data']['semester']
		if semester.lower() == 'even':
			semester = 0
		else:
			semester =1
		d1 = request.data['data']['p1startDate'].split('-')
		p1StartDate = datetime.datetime(int(d1[0]),int(d1[1]),int(d1[2]),12,0,0 ,tzinfo=pytz.UTC)

		d1 = request.data['data']['p1endDate'].split('-')
		p1EndDate = datetime.datetime(int(d1[0]),int(d1[1]),int(d1[2]),12,0,0 ,tzinfo=pytz.UTC)
				
		d1 = request.data['data']['p2startDate'].split('-')
		p2StartDate = datetime.datetime(int(d1[0]),int(d1[1]),int(d1[2]),12,0,0 ,tzinfo=pytz.UTC)
		
		d1 = request.data['data']['endDate'].split('-')
		endDate = datetime.datetime(int(d1[0]),int(d1[1]),int(d1[2]),12,0,0 ,tzinfo=pytz.UTC)
		
		try:
			p = Reg(status=regstatus,year=year,semester=semester,p1StartDate=p1StartDate,p1EndDate=p1EndDate,p2StartDate=p2StartDate,endDate=endDate)
			p.save()
		except Exception as e:
			print(e)
		return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def stopReg(request,format=None):
	if request.method == 'POST':
		Reg.objects.filter(status=True).delete()
		return Response({'status':True},status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def getRegInfo(request,format=None):
	if request.method == 'POST':
		email = request.data['data']['email']
		res_data = {}
		
		stu_obj = Student.objects.filter(email=email)
		if len(stu_obj) > 0 :
			res_data['studentStatus'] = True
		else:
			res_data['studentStatus'] = False

		reg_obj = Reg.objects.filter(status=True)
		if len(reg_obj) > 0:
			res_data['regStatus'] = True
		else:
			res_data['regStatus'] = False

		if res_data['regStatus'] == True:
			today = datetime.datetime.now().strftime('%Y-%m-%d').split('-')
			today = datetime.datetime(int(today[0]),int(today[1]),int(today[2]),tzinfo=pytz.UTC)

			reg_obj = reg_obj.values().first()

			p1startDate = reg_obj['p1StartDate']
			p1endDate = reg_obj['p1EndDate']

			p2startDate = reg_obj['p2StartDate']
			p2endDate = reg_obj['endDate']

			if getPhaseStatus(p1startDate,p1endDate,today):
				res_data['p1Status'] = True
			else:
				res_data['p1Status'] = False

			if getPhaseStatus(p2startDate,p2endDate,today):
				res_data['p2Status'] = True
			else:
				res_data['p2Status'] = False 

			res_data['p1startDate'] = p1startDate.strftime('%Y-%m-%d')
			res_data['p1endDate'] = p1endDate.strftime('%Y-%m-%d')

			res_data['p2startDate'] = p2startDate.strftime('%Y-%m-%d')
			res_data['p2endDate'] = p2endDate.strftime('%Y-%m-%d')

		
		if len(stu_obj)>0:
			stu_rollno = Student.objects.filter(email=email).values().first()['rollno']
			print(stu_rollno)
			lib_obj = LibraryFine.objects.filter(rollno=stu_rollno)
			if len(lib_obj)>0:
				res_data['libraryFine'] = str(lib_obj.values().first()['fine'])
			else:
				res_data['libraryFine'] = "0"

			hostel_obj = HostelFine.objects.filter(rollno=stu_rollno)
			if len(hostel_obj)>0:
				res_data['hostelFine'] = str(hostel_obj.values().first()['fine'])
			else:
				res_data['hostelFine'] = "0"

		print(res_data)
		return Response(res_data,status=status.HTTP_200_OK)

def getPhaseStatus(date1,date2,today):
	if date1 <= today  and date2 >= today:
		return True
	else:
		return False




