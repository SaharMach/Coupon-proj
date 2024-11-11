import { CouponList } from "./Coupon/CouponList";
import { UserList } from "./User/UserList";
import { ReportList } from "./Report/ReportList";

export function DynamicCmp({type, coupons, setCoupons}) {
    
    switch (type) {
        case 'Users':
            return <div className="dyn-cmp"><UserList /></div>
        case 'Coupons':
            return <div className="dyn-cmp"><CouponList coupons={coupons} setCoupons={setCoupons}/></div>
        case 'Reports':
            return <div className="dyn-cmp"><ReportList coupons={coupons} setCoupons={setCoupons}/></div>
        default:
            return null;
    }
}