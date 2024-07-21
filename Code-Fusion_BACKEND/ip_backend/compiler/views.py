from rest_framework.views import APIView
from rest_framework.response import Response
import subprocess
import os
import subprocess
import datetime
from pymongo import MongoClient
import hashlib
client = MongoClient(host="localhost", port=27017)
db = client['Code']
class Register(APIView):
    def post(self, request):
        details=request.data
        print(request.data)
        def user_exist():
         collection = db.Users
         result = collection.find({"Reg":request.data["Reg"]})
         l=[]
         for x in result:
            l.append(x)
         if(len(l)==0):
            return 0
         else:
            return 1
        if(user_exist()==1):
         return Response("USER ALREADY EXIST")
        else:
         collection = db.Users
         document=request.data
         passw=document['Pass']
         passcode=hashlib.sha256(passw.encode("utf-8")).hexdigest()
         #ssb=passw.encode("ascii")
         #b6=base64.b64encode(ssb)
         #b6s=b6.decode('ascii')
         document['Pass']=passcode
         result = collection.insert_one(document)
         return Response("ACCOUNT CREATED SUCCESSFULLY")
class Run(APIView):
    def post(self, request):
        if(request.data["cus_en"]=="1"):
           data=request.data["test"]
       # with open( 'test.txt', 'a+' ) as f1:
           #f1.write("hello")
        a=""
       
        if(a==None):
            a='#'
            op=""
       
            
        else:
            a=request.data["pro"]
            lang=request.data["lang"]
            try:
             sess=request.data["sess"]
            except:
               return Response("0")
            collection = db.Session
            result = collection.find({"sess":sess})
            l=[]
            for x in result:
             l.append(x)
            if(len(l)==0):
               return Response("0")
            user=l[0]['user']
            root="E:\\CODE"
            f_path=  os.path.join(root,user)
            if(os.path.exists(f_path)):
               print("exists")
            else:
              os.mkdir(f_path)   
                  
            a=a.split("\r")
            tstamp=str(datetime.datetime.now()).replace(" ",";")
            tstamp=str(tstamp.replace(":","."))

            f=str(user+tstamp)
            #get it from request
          
            if(lang=='python'):
                filename=f_path+"/"+f+'.py'
                with open(filename, 'w') as f:
                    f.writelines(a)
              
            
                try:
                    a=subprocess.check_output("python "+filename,input=data.encode("utf-8"))
                    op=a.decode("utf_8").rstrip()
                except:
                    a=subprocess.run("python "+filename,input=data.encode(),stderr=subprocess.PIPE)
                    op=a.stderr.decode("utf_8")
              
            elif(lang=='c'):
                filename=f_path+"/"+f+'.c'
                with open(filename, 'w') as f:
                    f.writelines(a)
                a=subprocess.run("gcc "+filename+" -o "+"main",stderr=subprocess.PIPE)
                if(a.returncode==0): 
                    try:
                     subprocess.check_output("main",shell=True,stderr=subprocess.STDOUT,input=data.encode())
                    except subprocess.CalledProcessError as e:
                     op=e.output

                  
          
                else:
               #to catch compile time error
                    op=a.stderr.decode("utf_8")
       
            else:
             filename=f_path+"/"+f+'.java'
             with open(filename, 'w') as f:
                f.writelines(a)
            
             a=subprocess.run("javac "+filename,stderr=subprocess.PIPE)
             if(a.returncode==0):
                 try:
                  a=subprocess.check_output("java "+filename,input=data.encode())
                  op=a.decode("utf_8").rstrip()
                 except:
                    #to catch run time
                    a=subprocess.run("java "+filename,input=data.encode(),stderr=subprocess.PIPE)
                    op=a.stderr.decode("utf_8")
            #if return code is 0, then it is successful 
            #a=subprocess.check_output("java "+'Main',input=data.encode())
            #op=a.decode("utf_8")
            #if return code is 1, stderr display
             else:
              op=a.stderr.decode("utf_8")
           

           # print("output:",op)
            res={"op":op}
            

        
   # return render(request,'home1.html',context={"data":op,"data1":inp,"lang":lang})
        return Response(res)
class check_exp(APIView):
    def post(self,request):
        print(request.data)
        try:
         sess=request.data['sessi']
        
        except:
           return Response("0")
        collection = db.Session
        result=collection.find({"sess":sess})
        l=[]
        for x in result:
            l.append(x)
        
        if(len(l)!=0):
                return Response("1")
        else:
                return Response("0")
class Uname(APIView):
   def post(self,request):
       collection = db.Session
       result=collection.find({"sess":request.data['sess']})
       l=[]
       for x in result:
            l.append(x)
        
       if(len(l)!=0):
          return Response(l[0]['user'])
       else:
                return Response("0")
      

class Login(APIView):
    def gen_sess(self,passw):
        return hashlib.sha256(passw.encode("utf-8")).hexdigest()+str(datetime.datetime.now())
    def post(self, request):
        details=request.data
        print(request.data)
        passw=request.data['pass']
        passw=hashlib.sha256(passw.encode("utf-8")).hexdigest()
        print(passw)
        user=request.data['user']
        def user_exist():
         collection = db.Users
         result = collection.find({"Reg":user})
         l=[]
         for x in result:
            l.append(x) 
         if(len(l)==0):
            return 0
         else:
            return 1
        if(user_exist()==1):
         collection = db.Users
         result = collection.find({"Reg":user})
         l=[]
         for x in result:
            l.append(x)
         db_pass=l[0]['Pass']
         #print(db_pass)
         if(db_pass==passw):
            print("SuccessFull")
            sess_id=Login.gen_sess(self,passw)
            collection = db.Session
            res={
                "q":"LOGIN SUCCESSFULL",
                 "sess":sess_id,
                 "user":user
                }
            session={
                "user":user,
                "sess":sess_id,
                "log_in":datetime.datetime.now(),
               "screen_time":"",
               "log_out":""
            }
         
            result = collection.insert_one(session)
            print(res)
            return Response(res)
         else:
            res={
                "q":"INVALID USERNAME OR PASSWORD",
                }
            print("INVALID USERNAME OR PASSWORD")
            return Response(res)

        
        else:
            res={
                "q":"USER NOT FOUND",
                }
            print("user not found")
            return Response(res)
class Logout(APIView):
    def post(self,request):
        try:
         sess=request.data['sessi']
       # mail=request.data['user']
         sec=request.data['sec']
         convert = str(datetime.timedelta(seconds = sec))

        except:
           return Response("0")
        collection=db.Session
        c1=db.Log
        collection.update_one({"sess":sess},{"$set":{"log_out":datetime.datetime.now()}})
        collection.update_one({"sess":sess},{"$set":{"screen_time":convert}})
        result = collection.find_one({"sess":sess})
        c1.insert_one(result)
        collection.delete_one({"sess":sess})
        return Response("1")
    
class Create_Quest(APIView):
    def post(self,request):
        try:
         sess=request.data['sessi']
        except:
           return Response("SESSION EXPIRES") #INVALID SESSION
        collection=db.Questions
        qname=request.data['qname']
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(qname)
        qname=soup.get_text()
        result = collection.find({"qname":qname})
        l=[]
        for x in result:
            l.append(x)
        if(len(l)!=0):
            return Response("ALREADY EXIST") #qname exist already
        obj=request.data['obj']
        tstamp=str(datetime.datetime.now()).replace(" ",";")
        tstamp=str(tstamp.replace(":","."))
        qid=hashlib.sha256(qname.encode("utf-8")).hexdigest()+tstamp
        sip=request.data['sip']
        sop=request.data['sop']
        test=request.data['test']
        pro=request.data['pro']
        lang=request.data['lang']
        collection1 = db.Session
        result = collection1.find({"sess":sess})
        l=[]
        for x in result:
            l.append(x)
        if(len(l)==0):
            return Response("SESSION EXPIRES") #SESSION EXPIRES
        user=l[0]['user']
        q_doc={
           "qid":qid,
           "qname":qname,
           "desc":obj,
           "created_by":user,
           "no.test":len(test),
           "test_lang":lang
        }            
  
        collection.insert_one(q_doc)
        root="E:\\Questions"
        f_path=  os.path.join(root,qid)
        if(os.path.exists(f_path)):
               print("exists")
        else:
            os.mkdir(f_path) 
        if(lang=='python'):
            filename=f_path+"/"+"pro"+'.py'
        elif(lang=='c'):
           filename=f_path+"/"+"pro"+'.c'
        else:
           filename=f_path+"/"+"pro"+'.java'
        with open(filename, 'w') as f:
                f.writelines(pro)

        filename=f_path+"/"+"desc.txt"
        with open(filename, 'w') as f:
                f.writelines(obj)

        filename=f_path+"/"+"sample_ip.txt"
        with open(filename, 'w') as f:
                f.writelines(sip)
    
        filename=f_path+"/"+"sample_op.txt"
        with open(filename, 'w') as f:
                f.writelines(sop)

        root2=os.path.join(f_path,"testcase")
        os.mkdir(root2)
        for i in range(0,len(test)):
            iname=root2+"/"+qid+str(i)+"ip.txt"
            oname=root2+"/"+qid+str(i)+"op.txt"
            with open(iname, 'w') as f:
                f.writelines(test[i]['inp'])
            with open(oname, 'w') as f:
                f.writelines(test[i]['op'])
        return Response("1")

class Practice(APIView):

    def sub(filename,lang,data):
        if(lang=="python"):
            
            try:
                a=subprocess.check_output("python "+filename,input=data.encode("utf-8"),stderr=subprocess.PIPE)
                op=a.stderr.decode("utf_8").rstrip()
            except:
                a=subprocess.run("python "+filename,input=data.encode(),stderr=subprocess.PIPE)
                op=a.stderr.decode("utf_8").rstrip()
             

        elif(lang=='c'):
           
            a=subprocess.run("gcc "+filename+" -o "+"main",stderr=subprocess.PIPE)
            print(a)
            if(a.returncode==0): 
                try:
                  
                    a=subprocess.check_output("main",shell=True,stderr=subprocess.STDOUT,input=data.encode())
                    op=a.decode("utf-8").rstrip()
                except subprocess.CalledProcessError as e:
                    op=e.output
                    op=op.decode("utf-8").rstrip()
            else:
               #to catch compile time error
                    op=a.stderr.decode("utf_8").rstrip()
        else:
            a=subprocess.run("javac "+filename,stderr=subprocess.PIPE)
            if(a.returncode==0):
                 try:
                  a=subprocess.check_output("java "+filename,input=data.encode())
                  op=a.decode("utf_8").rstrip()
                 except:
                    #to catch run time
                    a=subprocess.run("java "+filename,input=data.encode(),stderr=subprocess.PIPE)
                    op=a.stderr.decode("utf_8")
            #if return code is 0, then it is successful 
            #a=subprocess.check_output("java "+'Main',input=data.encode())
            #op=a.decode("utf_8")
            #if return code is 1, stderr display
            else:
              op=a.stderr.decode("utf_8")

        return(op)
        
    def post(self,request):
        expected=set()
        yours=set()
        inp=set()
        fd=set()
        user=""
        try:
            sess=request.data['sessi']
        except:
            return Response("0")  #invalid session
        collection = db.Session
        result = collection.find({"sess":sess})
        l=[]
        for x in result:
            l.append(x)
        if(len(l)==0):
          #  user=l[0]['user']
            return Response("0")  #session expired

  
        else:
            lang=request.data['lang']
            qid=request.data['qid']
            stime=request.data['time']
            convert = str(datetime.timedelta(seconds = stime))
            root="E:\\Practice"
            collection = db.Session
            result = collection.find({"sess":sess})
            user=l[0]['user']
            f_path=  os.path.join(root,user)
            if(os.path.exists(f_path)):
               print("exists")
            else:
              os.mkdir(f_path)   
            a=request.data['pro']
            a=a.split("\r")
            tstamp=str(datetime.datetime.now()).replace(" ",";")
            tstamp=str(tstamp.replace(":","."))

            f=str(user+tstamp)
          
            if(lang=='python'):
                filename=f_path+"/"+f+'.py'
                with open(filename, 'w') as f:
                    f.writelines(a)
            elif(lang=='c'):
                filename=f_path+"/"+f+'.c'
                with open(filename, 'w') as f:
                    f.writelines(a) 
            else:
                filename=f_path+"/"+f+'.java'
                with open(filename, 'w') as f:
                    f.writelines(a)
            collection1=db.Questions
            result = collection1.find({"qid":qid})
            l=[]
            for x in result:
             l.append(x)
             print(l)
            if(len(l)==0):
               return Response("0")
            count=l[0]['no.test']
            root="E:\\Questions"
            f_path=  os.path.join(root,qid)
            root2=os.path.join(f_path,"testcase")
            for i in range(0,count):
                data=open(root2+"/"+qid+str(i)+"ip.txt","r").read()
                op=open(root2+"/"+qid+str(i)+"op.txt","r").read()
                uop=Practice.sub(filename,lang,data)
                uop=uop.rstrip().replace("\r","")
                yours.add(uop.rstrip().replace("\r",""))

                expected.add(op) 
 
                
                inp.add(data)
                
                if(uop!=op):
                   # fd.add(i)
                    fd.add(data)

            print(expected)
            print(yours)


        res={"exp":expected,"yours":yours,"inp":inp,"tc":fd}
        if(len(fd)==0):
           new_doc={
              "qid":qid,
              "user":user,
              "screen_time":convert
           }
           coll=db.part_quest
           coll.insert_one(new_doc)
        return Response({"op":res})
        
class Crun(APIView):
    def post(self,request):
        
        try:
            sess=request.data['sessi']
        except:
            return Response("0")  #invalid session
        collection = db.Session
        result = collection.find({"sess":sess})
        l=[]
        for x in result:
            l.append(x)
        if(len(l)==0):
       
           # user=l[0]['user']
            return Response("0")  #session expired
        else:
         if(request.data['cus_en']==1):    
            print(55)      
            lang=request.data['lang']
            qid=request.data['qid']
            
            root="E:\\Run"
            collection = db.Session
            result = collection.find({"sess":sess})
            user=l[0]['user']
            f_path=  os.path.join(root,user)
            if(os.path.exists(f_path)):
               print("exists")
            else:
              os.mkdir(f_path)   
            a=request.data['pro']
            a=a.split("\r")
            tstamp=str(datetime.datetime.now()).replace(" ",";")
            tstamp=str(tstamp.replace(":","."))

            f=str(user+tstamp+qid)
          
            if(lang=='python'):
                filename=f_path+"/"+f+'.py'
                with open(filename, 'w') as f:
                    f.writelines(a)
            elif(lang=='c'):
                filename=f_path+"/"+f+'.c'
                with open(filename, 'w') as f:
                    f.writelines(a) 
            else:
                filename=f_path+"/"+f+'.java'
                with open(filename, 'w') as f:
                    f.writelines(a)
            collection1=db.Questions
            result = collection1.find({"qid":qid})
            l=[]
            for x in result:
             l.append(x)
             print(l)
            if(len(l)==0):
               return Response("0")
            own_lang=l[0]['test_lang']
            root="E:\\Questions"
            f_path1=  os.path.join(root,qid)
            if(own_lang=='python'):
             filename1=f_path1+"/"+"pro"+'.py'
            elif(own_lang=='c'):
             filename1=f_path1+"/"+"pro"+'.c'
            else:
             filename1=f_path1+"/"+"pro"+'.java'
            owner_pro=filename1
            user_pro=filename
            cus_in=request.data['test']
            ex_op=Practice.sub(owner_pro,own_lang,cus_in)
            yo_op=Practice.sub(user_pro,lang,cus_in)
            print(ex_op)
            print(yo_op)
            res={"ex_op":ex_op,"yo_op":yo_op}
            return Response({"res":res})
         else:
            print(55)      
            lang=request.data['lang']
            qid=request.data['qid']
            
            root="E:\\Run"
            collection = db.Session
            result = collection.find({"sess":sess})
            user=l[0]['user']
            f_path=  os.path.join(root,user)
            if(os.path.exists(f_path)):
               print("exists")
            else:
              os.mkdir(f_path)   
            a=request.data['pro']
            a=a.split("\r")
            tstamp=str(datetime.datetime.now()).replace(" ",";")
            tstamp=str(tstamp.replace(":","."))

            f=str(user+tstamp+qid)
          
            if(lang=='python'):
                filename=f_path+"/"+f+'.py'
                with open(filename, 'w') as f:
                    f.writelines(a)
            elif(lang=='c'):
                filename=f_path+"/"+f+'.c'
                with open(filename, 'w') as f:
                    f.writelines(a) 
            else:
                filename=f_path+"/"+f+'.java'
                with open(filename, 'w') as f:
                    f.writelines(a)
            collection1=db.Questions
            result = collection1.find({"qid":qid})
            l=[]
            for x in result:
             l.append(x)
           
            if(len(l)==0):
               return Response("0")
            own_lang=l[0]['test_lang']
            root="E:\\Questions"
            f_path1=  os.path.join(root,qid)
            if(own_lang=='python'):
             filename1=f_path1+"/"+"pro"+'.py'
            elif(own_lang=='c'):
             filename1=f_path1+"/"+"pro"+'.c'
            else:
             filename1=f_path1+"/"+"pro"+'.java'
            owner_pro=filename1
            user_pro=filename

            root="E:\\Questions"
            qid=request.data['qid']
            f_path=  os.path.join(root,qid)
            filename=f_path+"/"+"sample_ip.txt"
            sample_ip=open(filename,"r").read()
            ex_op=Practice.sub(owner_pro,own_lang,sample_ip)
            yo_op=Practice.sub(user_pro,lang,sample_ip)
            print(ex_op)
            print(yo_op)
            res={"ex_op":ex_op,"yo_op":yo_op}
            return Response({"res":res})
             
class Get_quest(APIView):
   def post(self,request):
        try:
            sess=request.data['sessi']
        except:
            return Response("0")  #invalid session
        collection = db.Session
        result = collection.find({"sess":sess})
        l=[]
        for x in result:
            l.append(x)
        if(len(l)==0):
       
            return Response("0")  #session expired
        else:
           collection1=db.Questions
           result1=collection1.find()
           l=[]
           for d in result1:
            a={}
            a['qid']=d['qid']
            a['qname']=d['qname']
            l.append(a)
           return Response(l)

class questdet(APIView):
   def post(self,request):
        try:
            sess=request.data['sessi']
        except:
            return Response("0")  #invalid session
        collection = db.Session
        result = collection.find({"sess":sess})
        l=[]
        for x in result:
            l.append(x)
        if(len(l)==0):
       
            return Response("0")  #session expired
        else:
           qid=request.data['qid']
           collection1=db.Questions
           result1=collection1.find({"qid":qid})
           root="E:\\Questions"
           f_path=  os.path.join(root,qid)
           filename=f_path+"/"+"sample_ip.txt"
           sample_ip=open(filename,"r").read()
           filename1=f_path+"/"+"sample_op.txt"
           sample_op=open(filename1,"r").read()
           l=[]
           for d in result1:
            a={}
            a['qid']=d['qid']
            a['qname']=d['qname']
            a['desc']=d['desc']
            a['sip']=sample_ip
            a['sop']=sample_op
            l.append(a)
           
           return Response(l)
                    


            
          
        

        