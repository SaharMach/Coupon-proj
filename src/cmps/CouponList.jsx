import { useState } from "react";
import { couponService } from "../services/coupon.service";
import { CouponForm } from "./CouponForm";
import { CouponCard } from "./CouponCard";

import toast from "react-hot-toast";
export function CouponList({coupons, setCoupons}) {
    const [showForm, setShowForm] = useState(false);
    const [couponToEdit, setCouponToEdit] = useState(null);

    function handleCreateCoupon(){
        setCouponToEdit(null)
        setShowForm(true)
    }

    function handleEditCoupon(coupon){
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
            <section className="user-list-con-header">
                <h3>Coupons list</h3>
                <button className="add-coupon-btn" onClick={handleCreateCoupon}>Create coupon</button>
            </section>

        {showForm && (
            <CouponForm
                couponToEdit={couponToEdit}
                setCoupons={setCoupons}
                setShowForm={setShowForm}
            />
        )}
        <CouponCard 
            handleEditCoupon={handleEditCoupon}
            onDeleteCoupon={onDeleteCoupon}
            coupons={coupons}
        />
    </div>
    );
}