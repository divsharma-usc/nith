from backend.userapi.models import UserProfile
from django.contrib.auth import authenticate
from rest_framework import serializers

import string
import random

from django.core.mail import EmailMultiAlternatives

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ( 'username','password','role')

    #method to validate the login credentials
    def validate(self,data):
    	
        credentials = {
    		'username' : data['username'],
    		'password' : data['password']
    	}
        if all(credentials.values()):
            user = UserProfile.objects.filter(username=credentials['username'])
            if len(user)>0:
                if user.first().password == credentials['password']: 
                    return user.first().role
                else:
                    return 0
            else:
                return 0

    #method to add new user
    def addNewUser(self,data):
        
        credentials = {
            'username' : data['username'],
            'email' : data['email'],
            'role' : data['role'].lower(),
            'userdetail' : data['userdetail'].lower()
        }
        
        if all(credentials.values()):
            users = UserProfile.objects.filter(username=credentials['username'])
            if len(users)>0:
                return  {'status':False,'msg':'username already exist'}
            
            password = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(6))
            int_role = 0
            try:
                if credentials['role'].lower() == 'library':
                    int_role = 2
                elif credentials['role'].lower() == 'hostel':
                    int_role = 3
                elif credentials['role'].lower() == 'department':
                    int_role = 4
                
                user = UserProfile(username=credentials['username'],useremail=credentials['email'],password=password,
                                   role=int_role,userdetail=credentials['userdetail'].lower()                        
                       )
                user.save()
               
                #Code to send email to the creadited user
                subject = 'NITH Semester Registration Portal'
                from_email = 'divyansh9595@gmail.com'
                to =  credentials['email']
                text_content = 'This is an important message.'
                html_content = '<p>Username <strong>'+credentials['username']+'</strong><br>password <strong>'+password+'</strong></p>'
                msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                msg.attach_alternative(html_content, "text/html")
                msg.send()
                
                return {'status':True,'msg':'user created successfully'}
            except Exception as e:
                print(e)
                return {'status':False,'msg':'internal server error'}

        else:
            return {'status':False,'msg':'invalid credentials'}

            


