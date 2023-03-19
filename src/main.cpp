#include <Arduino.h>
//#include "DHT.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
//#define DHTPIN 1     // what digital pin the DHT11 is conected to
//#define DHTTYPE DHT11   // setting the type as DHT11
//DHT dht(DHTPIN, DHTTYPE);
const char *ssid = "KASEE"; //Enter your WIFI ssid
const char *password = "Kasee579*"; //Enter your WIFI password
//const char *server_url = "http://192.168.0.108:8000/api/";// Nodejs application endpoint
//StaticJsonDocument<200> doc;
float h = 12.0;
float t = 13.0;
//Set up the client objet
WiFiClient client;
HTTPClient http;
void setup() {
   delay(3000);
   Serial.begin(115200);
//   dht.begin();
   WiFi.begin(ssid, password);
   while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
   }
   Serial.println("WiFi connected");
   delay(1000);
}
void loop() {
 // float h = dht.readHumidity();
 // float t = dht.readTemperature();         
  Serial.print("Humidity = ");
  Serial.print(h);
  Serial.print("%  ");
  Serial.print("Temperature = ");
  Serial.print(t); 
  Serial.println("C  ");  

  //create json document
  StaticJsonDocument<200> doc;

  //create object
  doc["humidity"] = h;
  doc["temperature"] = t;
  
  // Serialize JSON document
  String json;
  serializeJson(doc, json);

   /*
    JsonObject values = jsonBuffer.createObject();
    JsonObject values = doc.as<JsonObject>(); // get the values object
    JsonObject values= doc.to<JsonObject>();
    values["humidity"] = h;
    values["temperature"] = t;
  
    http.begin(client, "http://192.168.0.108:8000/api/");
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST();
    */

  // Send request
  http.begin(client, "http://192.168.0.108:6000/api/");
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(json);

 
    
  if(httpCode > 0){
      if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
         // String payload = http.getString();
        //  Serial.print("Response: ");Serial.println(payload);
          // Read response
          Serial.print("Response: ");
          Serial.println(http.getString());
        }
  }else{
         Serial.printf("[HTTP] GET... failed, error: %s", http.errorToString(httpCode).c_str());
   }
    http.end();
    delay(5000);
    h += 1;
    t += 1;
}