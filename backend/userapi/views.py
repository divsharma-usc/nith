import jwt,json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from backend.userapi.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def login(request,format=None):
    
	  if request.method == 'POST':
	  	user_type = UserSerializer.validate(request,request.data)
	  	if user_type > 0 :
	  		payload  = {  'user' : request.data['username'],
	  					  'role' : user_type
	  				   }
	  		jwt_token = jwt.encode(payload, "SECRET_KEY")
	  		return Response({'token':jwt_token, 'role':user_type},status=status.HTTP_200_OK)
	  	else:
	  		return Response({'msg': "Invalid credentials",'role':0},status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def addUser(request,format=None):

	if request.method == 'POST':
		res = UserSerializer.addNewUser(request,request.data)
		if res['status']:
			return Response({'msg': res['msg']},status=status.HTTP_200_OK)
		else:
			return Response({'msg': res['msg']},status=status.HTTP_401_UNAUTHORIZED)