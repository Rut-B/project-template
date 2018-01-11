import { Component, OnInit } from '@angular/core';
import { CalendarEvent, } from "angular-calendar";
//import {CalendarMessageService}from '../calendar-message.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
import { query } from '@angular/core/src/animation/dsl';
import {DataService} from '../data.service'

/*export class appointment{
  event:CalendarEvent;
  userName:string;
  treatment:string;
}*/
export class appoi{
  userName: string;
  type:string;
  start:Date;
  end:Date;
}
export interface aDay{
  date:string;
  hoursEvning:string;
  hoursMorning:string;

}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: string = 'month'; 
   viewDate: Date = new Date();
  events:CalendarEvent[]; 

  /*treatment:string;
  userName:string; 
  apps:appointment[];*/
  myAppois:appoi[]; 
  mySpecDays:aDay[];
  myDays:aDay[];
  clickedDate: Date;  
  //appoi:appointment;
    private col:AngularFirestoreCollection<any>;
    private myAppCol:AngularFirestoreCollection<any>;
    private mySpeDays:AngularFirestoreCollection<any>;
    private mySettDays:AngularFirestoreCollection<any>;
      constructor(private afs: AngularFirestore ,private dataService:DataService) {
       //this.itemDoc =this.afs.doc("events/1"); 
       this.col=this.afs.collection("events"); 
       this.viewDate = new Date();  
       this.col.valueChanges().subscribe(res=>{
       /*  this.apps=res;
        for(var i=0;i<res.length;i++){
          this.events[i]=res[i].event;
        }*/
        this.events=res; 
       });  
       this.myAppCol=this.afs.collection("myApointments");
       this.myAppCol.valueChanges().subscribe(res=>{
        this.myAppois=res;
       });
       this.mySpeDays=this.afs.collection("specificDays");
       this.mySpeDays.valueChanges().subscribe(res=>{
        this.mySpecDays=res;
       });
       this.mySettDays=this.afs.collection("Setting Days");
       this.mySettDays.valueChanges().subscribe(res=>{
        this.myDays=res;
       });
       

     }

  dayClicked(){
  this.addEvent(this.clickedDate);
  alert(this.dataService.totalDuration)
  alert(this.dataService.selected_treatments);
  }
  
  addEvent(date){
     date=this.format(date);
     date=date+" 10:30:00";
    this.viewDate = new Date();
    let event: CalendarEvent = {
      start:new Date(date),
      // end: new Date(),
       title: "appointment",
       color: {
         primary: "#00FF00",
         secondary: "#afafaf"
       }   
     };  
 /*this.userName="noamijofen";
 this.treatment="laser";
    let appoi: appointment={
      event:cevent,
     userName:this.userName,
     treatment:this.treatment
    }*/
    
  // this.messageService.sendMessage(event);
    this.col.add(event).then(res => {
    })
 // alert("!!");
  }

  ngOnInit() {
  }
format(curr){
  var dd = curr.getDate();
var mm = curr.getMonth()+1; 
var yyyy =curr.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = mm+'/'+dd+'/'+yyyy;
return today;
}

trying(){
  var day=this.events[0].start.getDate().toString();
  var month=this.events[0].start.getMonth();
  var year=this.events[0].start.getFullYear();
  alert(day+", "+month+" ,"+year);
if(this.viewDate.getMonth()==month&&this.viewDate.getFullYear()==year){
   var cc=document.getElementsByClassName("cal-cell");
  for(var i=7;i<42;i++){ 
   if(cc[i].getElementsByTagName("span")[1]!=null){
     if(cc[i].getElementsByTagName("span")[1].innerText==day){
     alert("hay!!!"+" "+cc[i].getElementsByTagName("span")[1].innerText);
    cc[i].className="a";
   }
  }
  else{
    if(cc[i].getElementsByTagName("span")[0].innerText==day){
      alert("hay!!!"+" "+cc[i].getElementsByTagName("span")[0].innerText);
     cc[i].className="a";
  }
}
}
}
}

public getAvailability(day:Date):string[]{
  
return ['start','end'];
}

public parseTime(time:string):number[]{//return hours and min.
  return null;
}

public getDist(startTime:number[],endTime:number[]):number{
return 0;
}



/*********************************************************** 
* this function return boolean paramter to paint the scechule..
*************************************************************/
/*
public scheduleTime(day:Date, duration:number):boolean
{

if (duration == 0)
{
  return true;
}
let timeToWork:string[];
timeToWork= this.getAvailability(day);//get array of start:end,start:end
let startMorning=timeToWork[0];
let endMorning=timeToWork[1];
let startEvening=timeToWork[2];
let endtEvening=timeToWork[3];
let durationA = this.getDist(this.parseTime(endMorning),this.parseTime(startMorning));
let durationB = this.getDist(this.parseTime(endtEvening),this.parseTime(startEvening));

if ((duration >durationA)&&
   (duration >durationB))
   {
     return false;
   }
  
  let appointmensArray:appoi[]; 
  SVGLength
  this.myAppCol=this.afs.collection("myApointments");
  this.myAppCol.valueChanges().subscribe(res=>{
    appointmensArray=res;
  });
for(let i=0; i<appointmensArray.length;i++)
{
  
}
return false;
}
/*
export class appoi{
  userName: string;
  type:string;
  start:Date;
  end:Date;
}*/

}