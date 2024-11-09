import { UserList } from "./UserList";


export function DynamicCmp({type}) {
    
    switch (type) {
        case 'Users':
            return <div className="dyn-cmp"><UserList /></div>
        case 'Coupons':
            return <div className="dyn-cmp">Coupons</div>
        case 'Reports':
            return <div className="dyn-cmp">Reports</div>
        default:
            return null;
    }
}