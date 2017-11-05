from shapely.geometry import Point
from shapely.geometry.polygon import Polygon
#from points import arr
from pp import arr
PATH="/home/amit/Desktop/Visualization/sampled_data.csv"
path="/home/amit/Desktop/Visualization/points.txt"

fw=open('/home/amit/Desktop/Visualization/mapped_data.csv','w')	
count=0
with open(PATH) as f2:
	for line in f2:
		if(count==0):
			lst=line.split(',')
			lst[-1]=lst[-1].strip()
			lst.append('C_ID')
			output=",".join(lst)
			print(output)
			fw.write(output+"\n")
			count+=1
			continue
		for i in range(len(arr)):
			polygon= Polygon(arr[i])	
			lst= line.split(',')
			lst[-1]=lst[-1].strip()
			start= float(lst[3])
			end=float(lst[4])
			#print(start+"  "+end)
			point=Point(start,end)
			if polygon.contains(point):
				lst.append(str(i+1))
				break;
		output=",".join(lst)
		fw.write(output+"\n")
		#print(output)
		count+=1
		