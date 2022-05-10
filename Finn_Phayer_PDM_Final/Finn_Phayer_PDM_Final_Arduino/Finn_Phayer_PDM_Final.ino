// ****************************************************
// ***** LSU DDEM Pathway:                            *
// ***** Programming Digital Media                    *
// Jesse Allison & Anthony T. Marasco                 *
// PDM - Serial Communication between P5 and Arduino  *

//Modified by Finn Phayer

#include "PDMSerial.h"
// #include <PDMSerial.h>   // use if PDMSerial is in your libraries folder

PDMSerial pdm;
const int analogStickY = A0;  //the analog input pin sensor is attached to
const int analogStickX = A1;
const int squishButton = 7;
const int squishLED = 8;

int buttonState = 0;

void setup() {
  // put your setup code here, to run once:
  
    // Input setup – add more inputs if desired
  pinMode(analogStickY, INPUT);
  pinMode(analogStickX, INPUT);
  pinMode(squishButton, INPUT);
  pinMode(squishLED, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  
    // Inputs – sample and prep the data for transmission
  int analogStickValueY = analogRead(analogStickY);//read the value from the analog sensor
  int analogStickValueX = analogRead(analogStickX);
  buttonState = digitalRead(squishButton);
  
    // Transmit whatever sensors you like. When you are done, transmit end for the default ";" or your own separator.
  pdm.transmitSensor("Y", analogStickValueY);
  pdm.transmitSensor("X",analogStickValueX);
  pdm.transmitSensor("button", buttonState);
  pdm.transmitSensor("end");

  boolean newData = pdm.checkSerial();
  
  if(newData) {
    if(pdm.getName().equals(String("led"))) {
      digitalWrite(squishLED, pdm.getValue());
    }
  }

}
