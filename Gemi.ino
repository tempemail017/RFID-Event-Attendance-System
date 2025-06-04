#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN D3
#define SS_PIN D4
#define BUZZER_PIN D2

MFRC522 mfrc522(SS_PIN, RST_PIN);

// Set Up Initialization.
void setup(){
  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println("Scanner Ready: ");
}

void loop() {
  if (mfrc522.PICC_IsNewCardPresent()){
    if (mfrc522.PICC_ReadCardSerial()){
      
      for (byte i = 0; i < mfrc522.uid.size; i++){
        Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : "");
        Serial.print(mfrc522.uid.uidByte[i], HEX);
      }
      Serial.println();
      
      buzz(); 
      mfrc522.PICC_HaltA();
    }
  }
}

// Function : Buzzer.
void buzz() {
  tone(BUZZER_PIN, 1000, 200);
}




