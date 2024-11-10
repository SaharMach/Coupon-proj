import { useState } from "react";
import { couponService } from "../services/coupon.service";
import { CouponForm } from "./CouponForm";
import toast from "react-hot-toast";
export function CouponList({coupons, setCoupons}) {
    const [showForm, setShowForm] = useState(false);
    const [couponToEdit, setCouponToEdit] = useState(null);

    const handleCreateCoupon = () => {
        setCouponToEdit(null)
        setShowForm(true)
    }

    const handleEditCoupon = (coupon) => {
        setCouponToEdit(coupon);
        setShowForm(true)
    }


    async function onDeleteCoupon(couponId) {
        try {
            await couponService.remove(couponId)
            const newCoupons = coupons.filter(coupon => coupon._id !== couponId)
            setCoupons(newCoupons)
            toast.success("Coupon deleted successfully")
        } catch(err) {
            console.log("Can't delete coupon");
            toast.error("Can't delete coupon")
        }
    }

    return (
        <div className="coupon-list">
        <button className="add-coupon-btn" onClick={handleCreateCoupon}>Create New Coupon</button>

        {showForm && (
            <CouponForm
                couponToEdit={couponToEdit}
                setCoupons={setCoupons}
                setShowForm={setShowForm}
            />
        )}

        {coupons.map((coupon) => (
            <div className={`coupon-card ${coupon.stackable ? 'stackable' : ''}`} key={coupon._id}>
                <div className="coupon-header">
                    <h3 className="coupon-code">{coupon.code}</h3>
                    <span className="coupon-discount">
                        {coupon.discount.type === 'percentage'
                            ? `${coupon.discount.value}% OFF`
                            : `₪${coupon.discount.value} OFF`}
                    </span>
                </div>
                <div className="coupon-body">
                    <p className="coupon-desc">{coupon.desc}</p>
                    <p className="coupon-expires">
                        Expires: {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'Unlimited'}
                    </p>
                    <p className="coupon-usage">
                        Usage: {coupon.usedCount}/{coupon.usageLimit}
                    </p>
                    <p className="coupon-created-by">
                        Created by: {coupon.createdBy.username}<br />
                        At: {new Date(coupon.createdBy.at).toLocaleDateString()}
                    </p>
                    {coupon.stackable && <div className="coupon-badge">Stackable</div>}
                </div>
                <button className="edit-btn" onClick={() => handleEditCoupon(coupon)}>
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                </button>
                <button className="delete-btn" onClick={() => onDeleteCoupon(coupon._id)}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </div>
        ))}
    </div>
    );
}