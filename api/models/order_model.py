from sqlalchemy import Column, String, Float, DateTime, Boolean, Text, ForeignKey, Enum as SQLEnum, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from database import Base
from sqlalchemy.dialects.postgresql import UUID

# Enums
class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    PRESCRIPTION_UPLOADED = "prescription_uploaded"
    VERIFYING = "verifying"
    VERIFIED = "verified"
    REJECTED = "rejected"
    PAYMENT_PENDING = "payment_pending"
    PAID = "paid"
    PROCESSING = "processing"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class PrescriptionStatus(str, enum.Enum):
    PENDING = "pending"
    VALID = "valid"
    INVALID = "invalid"

# Order Model
class Order(Base):
    __tablename__ = "orders"
    
    id = Column(String(50), primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    order_id = Column(String(50), unique=True, nullable=False, index=True)
    status = Column(SQLEnum(OrderStatus), default=OrderStatus.PENDING, nullable=False)
    prescription_required = Column(Boolean, default=True)
    prescription_status = Column(SQLEnum(PrescriptionStatus), default=PrescriptionStatus.PENDING)
    prescription_file_path = Column(String(500))
    prescription_verified_at = Column(DateTime(timezone=True))
    verification_notes = Column(Text)
    rejection_reason = Column(Text)
    
    # Delivery information
    delivery_address = Column(String(500), nullable=False)
    # delivery_phone = Column(String(20), nullable=False)
    
    # Pricing
    subtotal = Column(Float, default=0.0)
    delivery_fee = Column(Float, default=0.0)
    total_amount = Column(Float, default=0.0)
    
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="orders")
    # order_items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    # order_pharmacies = relationship("OrderPharmacy", back_populates="order", cascade="all, delete-orphan")
    # payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")
    # tracking = relationship("OrderTracking", back_populates="order", cascade="all, delete-orphan")

# OrderItem Model
class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(String(50), primary_key=True, index=True)
    order_id = Column(String(50), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    # medication_id = Column(String(50), ForeignKey("medications.id", ondelete="CASCADE"), nullable=False)
    medication_name = Column(String(255), nullable=False)  # Snapshot of name at time of order
    dosage = Column(String(100))
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    # order = relationship("Order", back_populates="order_items")
    # medication = relationship("Medication", back_populates="order_items")