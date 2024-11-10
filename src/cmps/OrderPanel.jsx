import { useState } from "react"
import { couponService } from "../services/coupon.service"
import toast from "react-hot-toast"

export function OrderPanel() { 
    const [couponCode, setCouponCode] = useState('')
    const [activeCoupons, setActiveCoupons] = useState([])
    const [orderAmount] = useState(100)
    const [finalAmount, setFinalAmount] = useState(100)

    async function handleApplyCoupon(e) {
        e.preventDefault()
        try {

            const coupon = await couponService.validateCoupon(couponCode)
            console.log(coupon);
            
            if(activeCoupons.some(c => c.code === couponCode)){
                toast.error('Coupon already in use!')
                return
            }

            if(!coupon.stackable && activeCoupons.length > 0){
                toast.error("This coupon isn't stackable")
                return
            }

            if(activeCoupons.some(c => !c.stackable)) {
                toast.error("Exisiting coupon isn't stackable")
                return
            }

            const couponsToSave = [...activeCoupons, coupon]
            const newFinalAmout = calculateFinalAmount(orderAmount, couponsToSave)

            if(newFinalAmout > 100) {
                toast.error("Final amount can't exceed ₪100")
            }

            setActiveCoupons(couponsToSave)
            setFinalAmount(newFinalAmout)
            setCouponCode('')

            toast.success("Coupon activated successfully!")
        } catch (err) {
            console.log('Cant use this coupon')
            toast.error("Code isn't valid")
        }
    }

    function calculateFinalAmount(initialAmount, coupons) {
        let amount = initialAmount
        
        const sortedCoupons = [...coupons].sort((a, b) => 
            a.discount.type === 'amount' ? -1 : 1
        )

        for (const coupon of sortedCoupons) {
            if (coupon.discount.type === 'amount') {
                amount -= coupon.discount.value
            } else {
                amount = amount * (1 - coupon.discount.value / 100)
            }
        }

        return Math.max(0, Math.round(amount * 100) / 100)
    }

    function removeCoupon(couponToRemove) {
        const updatedCoupons = activeCoupons.filter(c => c.code !== couponToRemove.code)
        const newFinalAmount = calculateFinalAmount(orderAmount, updatedCoupons)
        setActiveCoupons(updatedCoupons)
        setFinalAmount(newFinalAmount)
    }

    return (
        <div className="order-panel">
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="amount-details">
                        <div className="original-amount">
                            <span>Original Amount:</span>
                            <span>₪{orderAmount.toFixed(2)}</span>
                        </div>
                        <div className="final-amount">
                            <span>Final Amount:</span>
                            <span>₪{finalAmount.toFixed(2)}</span>
                        </div>
                        {finalAmount !== orderAmount && (
                            <div className="savings">
                                <span>You Save:</span>
                                <span>₪{(orderAmount - finalAmount).toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="coupon-section">
                    <h3>Add Coupon</h3>
                    <form onSubmit={handleApplyCoupon} className="coupon-home-form">
                        <div className="input-group">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.trim())}
                                placeholder="Enter coupon code"
                                className="coupon-input"
                            />
                            <button type="submit" className="apply-btn">
                                Apply
                            </button>
                        </div>
                    </form>

                    {activeCoupons.length > 0 && (
                        <div className="active-coupons">
                            <h4>Active Coupons</h4>
                            <ul className="active-coupons-list">
                                {activeCoupons.map((coupon) => (
                                    <li key={coupon.code} className="coupon-item">
                                        <span className="coupon-code">{coupon.code}</span>
                                        <span className="coupon-discount">
                                            {coupon.discount.type === 'percentage' 
                                                ? `${coupon.discount.value}% off`
                                                : `₪${coupon.discount.value} off`}
                                        </span>
                                        <button 
                                            onClick={() => removeCoupon(coupon)}
                                            className="remove-btn"
                                        >
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
    )
}