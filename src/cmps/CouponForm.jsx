import { useState, useEffect } from "react";
import { couponService } from "../services/coupon.service";
import { userService } from "../services/user.service";
import toast from "react-hot-toast";

export function CouponForm({ couponToEdit, setCoupons, setShowForm }) {
    const [coupon, setCoupon] = useState({
        _id: '',
        code: '',
        desc: '',
        discount: { type: 'percentage', value: 0 },
        expiresAt: '',
        stackable: false,
        usageLimit: 100,
        usedCount: 0,
        createdBy: { _id: '', username: '' },
    });

    useEffect(() => {
        if (couponToEdit) {
            setCoupon(couponToEdit)
        }
    }, [couponToEdit]);

    function handleChange (e) {
        const { name, value, type, checked } = e.target
        setCoupon((prevCoupon) => ({
            ...prevCoupon,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    function handleDiscountChange(e) {
        const { name, value } = e.target
        setCoupon((prevCoupon) => ({
            ...prevCoupon,
            discount: {
                ...prevCoupon.discount,
                [name]: value,
            },
        }));
    };

    function handleDateChange(e) {
        setCoupon((prevCoupon) => ({
            ...prevCoupon,
            expiresAt: e.target.value ? new Date(e.target.value) : null,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (coupon._id) {
                await couponService.update(coupon);
                toast.success("Coupon updated successfully")
            } else {
                const user = userService.getLoggedinUser()
                coupon.createdBy = {_id : user._id, username: user.username, at: new Date()}
                await couponService.add(coupon)
                toast.success("Coupon created successfully")
            }

            const updatedCoupons = await couponService.getCoupons()
            setCoupons(updatedCoupons)
            setShowForm(false)
        } catch (err) {
            toast.error("Failed to save coupon")
            console.log("Error saving coupon:", err)
        }
    }

    function formatDateForInput(date) {
        if (!date) return '';
        if (typeof date === 'string') {
            date = new Date(date);
        }
        if (date instanceof Date && !isNaN(date)) {
            return date.toISOString().split('T')[0]
        }
        return ''
    }
    return (
        <div className="coupon-form">
            <h3>{coupon._id ? "Edit Coupon" : "Create Coupon"}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Coupon Code</label>
                    <input
                        type="text"
                        name="code"
                        value={coupon.code}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        name="desc"
                        value={coupon.desc}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Discount Type</label>
                    <select
                        name="type"
                        value={coupon.discount.type}
                        onChange={handleDiscountChange}
                    >
                        <option value="percentage">Percentage</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>

                <div>
                    <label>Discount Value</label>
                    <input
                        type="number"
                        name="value"
                        value={coupon.discount.value}
                        onChange={handleDiscountChange}
                        required
                    />
                </div>
                <div>
                    <label>Expires At</label>
                    <input
                        type="date"
                        value={formatDateForInput(coupon.expiresAt)}
                        onChange={handleDateChange}
                    />
                </div>

               
                <div>
                    <label>Usage Limit</label>
                    <input
                        type="number"
                        name="usageLimit"
                        value={coupon.usageLimit}
                        onChange={handleChange}
                    />
                </div>

                <div className="stackable">
                    <label>Stackable</label>
                    <input
                        type="checkbox"
                        name="stackable"
                        checked={coupon.stackable}
                        onChange={handleChange}
                    />
                </div>


                <button type="submit">{coupon._id ? "Update Coupon" : "Create Coupon"}</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        </div>
    );
}
