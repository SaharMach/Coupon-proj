


export function DynamicCmp({props}) {
    
    switch (props) {
        case 'Users':
            console.log('clicked');
            break
        case 'Coupons':
            console.log('coupons');
            break
        case 'Reports':
            console.log('reports');
            break
        default:
            return null;
    }
}