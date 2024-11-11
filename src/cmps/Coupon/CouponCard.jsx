import { utilService } from "../../services/util.services"
export function CouponCard({coupons, handleEditCoupon, onDeleteCoupon}) {

    return (
        <>
            {coupons.map((coupon) => (
                <li className={`coupon-card ${coupon.stackable ? 'stackable' : ''}`} key={coupon._id}>
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
                            Expires: {coupon.expiresAt ? utilService.formatDate(new Date(coupon.expiresAt).toLocaleDateString()) : 'Unlimited'}
                        </p>
                        <p className="coupon-usage">
                            Usage: {coupon.used.count}/{coupon.usageLimit}
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
                </li>
            ))}
        </>
    )
}