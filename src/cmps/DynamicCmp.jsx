import { CouponList } from "./CouponList";
import { UserList } from "./UserList";


export function DynamicCmp({type, coupons, setCoupons}) {
    
    switch (type) {
        case 'Users':
            return <div className="dyn-cmp"><UserList /></div>
        case 'Coupons':
            return <div className="dyn-cmp"><CouponList coupons={coupons} setCoupons={setCoupons}/></div>
        case 'Reports':
            return <div className="dyn-cmp">Reports</div>
        default:
            return null;
    }
}