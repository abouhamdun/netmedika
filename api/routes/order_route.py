from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime
import uuid
from schemas.order_schema import *
from utils.doc_verify import *
from database import get_db


router = APIRouter(prefix="/api/v1/orders", tags=["orders"])

@router.post("/create", response_model=OrderResponse, status_code=201)
async def create_order(
    order_data: CreateOrderRequest,
    # db: Annotated[Session, Depends(get_db)]
):
    """
    Create a new medication order
    """
    try:
        # Generate order ID
        order_id = f"ORD_{uuid.uuid4().hex[:12].upper()}"
        
        # Check if prescription is required (you can add logic to determine this)
        requires_prescription = True  # Set based on medication type
        
        # Create order in database
        new_order = {
            "order_id": order_id,
            "user_id": order_data.user_id,
            "status": OrderStatus.PENDING,
            "prescription_required": requires_prescription,
            "prescription_status": PrescriptionStatus.PENDING if requires_prescription else None,
            "medications": [med.model_dump() for med in order_data.medications],
            "delivery_address": order_data.delivery_address,
            "created_at": datetime.now()
        }
        
        # Save to database (implement your DB logic)
        # db.add(new_order)
        # db.commit()
        
        return OrderResponse(
            **new_order,
            message="Order created successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to create order: {str(e)}"
        )

@router.post("/{order_id}/upload_prescription")
async def upload_prescription(
    order_id: str,
    background_tasks: BackgroundTasks,
    prescription: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload prescription document for an order
    """
    try:
        # Fetch order from database
        # order = db.query(Order).filter(Order.order_id == order_id).first()
        # if not order:
        #     raise HTTPException(status_code=404, detail="Order not found")
        
        # Mock order for demonstration
        order = {"order_id": order_id, "status": OrderStatus.PENDING}
        
        # Save prescription file
        file_path = f"prescriptions/{order_id}_{prescription.filename}"
        # Implement file storage (local, S3, etc.)
        # with open(file_path, "wb") as f:
        #     content = await prescription.read()
        #     f.write(content)
        
        # Update order status
        # order.status = OrderStatus.VERIFYING
        # order.prescription_file_path = file_path
        # db.commit()
        
        # Verify prescription in background
        verification_result = await verify_prescription_document(prescription)
        
        if verification_result["valid"]:
            # Update order status
            # order.prescription_status = PrescriptionStatus.VALID
            # order.status = OrderStatus.VERIFIED
            # db.commit()
            
            # Find matching pharmacies
            pharmacies = await find_matching_pharmacies([], order.get("delivery_city", "Kano"))
            
            # Notify pharmacies in background
            background_tasks.add_task(notify_pharmacies, order_id, pharmacies)
            
            return {
                "order_id": order_id,
                "status": "verified",
                "prescription_status": "valid",
                "matched_pharmacies": len(pharmacies),
                "message": "Prescription verified successfully. Pharmacies have been notified.",
                "next_step": "payment"
            }
        else:
            # Update order with rejection
            # order.prescription_status = PrescriptionStatus.INVALID
            # order.status = OrderStatus.REJECTED
            # order.rejection_reason = verification_result["reason"]
            # db.commit()
            
            return {
                "order_id": order_id,
                "status": "rejected",
                "prescription_status": "invalid",
                "reason": verification_result["reason"],
                "message": "Prescription verification failed. Please upload a valid prescription."
            }
            
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to process prescription: {str(e)}"
        )

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: str,
    db: Session = Depends(get_db)
):
    """
    Get order details by ID
    """
    # Fetch from database
    # order = db.query(Order).filter(Order.order_id == order_id).first()
    # if not order:
    #     raise HTTPException(status_code=404, detail="Order not found")
    
    # Mock response
    return OrderResponse(
        order_id=order_id,
        user_id="user_123",
        status=OrderStatus.PENDING,
        prescription_required=True,
        prescription_status=PrescriptionStatus.PENDING,
        medications=[
            MedicationItem(medication_name="Sample Med", quantity=1)
        ],
        delivery_address="123 Sample St",
        created_at=datetime.now(),
        message="Order details retrieved"
    )

@router.get("/user/{user_id}")
async def get_user_orders(
    user_id: str,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """
    Get all orders for a specific user
    """
    # Query database for user orders
    # orders = db.query(Order).filter(Order.user_id == user_id).offset(skip).limit(limit).all()
    
    return {
        "user_id": user_id,
        "total_orders": 0,
        "orders": []
    }