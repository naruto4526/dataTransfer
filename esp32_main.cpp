#include <WiFi.h>
#include "MAX30105.h"


uint32_t red[110];
uint32_t ir[110];
const char *ssid =  "naruto";
const char *pass =  "narutouzumaki";
char jsonBuffer[6000] = "{\"updates\":[";
WiFiClient client;
char server[] = "https://key-piglet-whole.ngrok-free.app/";
unsigned long deltaT = 1;


int button = 0;
float prevTime = 0, pTime = 0;

MAX30105 particleSensor;

void setup() {
    Serial.begin(9600);
    Serial.println("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    pinMode(23,INPUT); 

  if (particleSensor.begin() == false)
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }
  particleSensor.setup();

}

void loop() {
  
  button = digitalRead(23);
  if(button == 1) {
    Serial.println("Place finger on the sensor");
    delay(3000);
    button = digitalRead(23);
  }
  else Serial.println("Connect pin 23 to Vcc");
  if(button == 1) {
    sendData( ); //when button pressed, get ir and red, and send data to c
  }  

}
//sends data in bulk and then sends over temperature reading.
void updatesJson(char* jsonBuffer,uint32_t x, uint32_t y){

  strcat(jsonBuffer,"{");
 
  size_t lengthT;

  strcat(jsonBuffer, "\"IR\":");//"{delta_t:1,field1:800,field2:700},"  
  lengthT = String(x).length();
  String(x).toCharArray(temp,lengthT+1);
  strcat(jsonBuffer,temp);
  strcat(jsonBuffer,",");

  strcat(jsonBuffer, "\"Red\":");
  lengthT = String(y).length();
  String(y).toCharArray(temp,lengthT+1);
  strcat(jsonBuffer,temp);
  strcat(jsonBuffer,"},");

}

void httpRequest(char* data) {

  client.stop();
  String data_length = String(strlen(data)+1); 
  Serial.println(data);
 
  if (client.connect(server, 80)) {
    client.println("POST HTTP/1.1"); // 
    client.println("Host: https://key-piglet-whole.ngrok-free.app/");
    client.println("Content-Type: application/json");
    client.println("ngrok-skip-browser-warning: true");
    client.println();
    client.println(data);
  }
  else {
    Serial.println("Failure: Failed to connect to ThingSpeak");
  }
  delay(250); 
  client.parseFloat();
  String resp = String(client.parseInt());
  Serial.println("Response code:"+resp); 
  delay(1000);
}

void sendData() {

//hundred data and put into array
  for(int i = 0; i < 101; i++) {
    red[i] = particleSensor.getRed();
    ir[i] = particleSensor.getIR();
    Serial.print(red[i]);
    Serial.print(",");
    Serial.println(ir[i]);
  }

  for(int i = 0; i < 101; i++) updatesJson(jsonBuffer,ir[i],red[i]);
  
  strcat(jsonBuffer,"]}");
  httpRequest(jsonBuffer);
}
