from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel
from models.order_model import *

class MedicationItem(BaseModel):
    medication_name: str
    quantity: int
    dosage: Optional[str] = None

class CreateOrderRequest(BaseModel):
    user_id: str
    medications: List[MedicationItem]
    delivery_address: str

class MedicationItemResponse(BaseModel):
    medication_name: str
    dosage: Optional[str]
    quantity: int
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    order_id: str
    user_id: str
    status: OrderStatus
    prescription_required: bool
    prescription_status: Optional[PrescriptionStatus]
    medications: List[MedicationItemResponse] = []
    delivery_address: str
    created_at: datetime
    message: str
    
    
    class Config:
        from_attributes = True

class PrescriptionUploadResponse(BaseModel):
    order_id: str
    order_number: str
    status: str
    prescription_status: str
    prescription_url: Optional[str]
    matched_pharmacies: int
    message: str
    next_step: str