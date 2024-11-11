import { storageService } from "./async-storage.service"
import { utilService } from "./util.services"

const STORAGE_KEY = 'couponDB'

export const couponService = {
    getCoupons,
    remove,
    add,
    update,
    validateCoupon,
    getCouponsByUser,
    getCouponsByDateRange,
    getUsageData,
}

//Adds a new coupon to the storage
async function add(coupon) {
    try {
        const res = await storageService.post(STORAGE_KEY, coupon)
        return res 
    } catch (err) {
        console.error('Failed to add coupon:', err)
        throw err
    }
}

//Updates an existing coupon in the storage
async function update(coupon) {
    try {
        return await storageService.put(STORAGE_KEY, coupon)    
    } catch (err) {
        console.log("can't update coupon", err)
        throw err
    }
}

//Fetch all coupons from the storage or loads demo coupons if none exist
async function getCoupons() {
    try {
        let coupons = await storageService.query(STORAGE_KEY)
        if (!coupons || !coupons.length) {
            await loadDemoCoupons()
            coupons = await storageService.query(STORAGE_KEY)
        }
        return coupons
    } catch (err) {
        console.log("Can't get coupons", err);
        throw err
    }
}

//Fetch coupons created by a specific user based on username
async function getCouponsByUser(username) {
    try {
        const coupons = await storageService.query(STORAGE_KEY)
        return coupons.filter(coupon => coupon.createdBy.username.toLowerCase() === username.toLowerCase())
    } catch (err) {
        console.error("Failed to get coupons by user:", err)
        throw err
    }
}

//Fetch coupons by a specific date range and current filtered coupons(if there are)
async function getCouponsByDateRange(startDate, endDate, baseCoupons = null) {
    try {
        const couponsToFilter = baseCoupons || await storageService.query(STORAGE_KEY);
        
        return couponsToFilter.filter(coupon => {
            const couponDate = new Date(coupon.createdBy.at);
            return couponDate >= new Date(startDate) && 
                   couponDate <= new Date(endDate);
        });
    } catch (error) {
        console.error("cant filter coupons by date range:", error);
        throw error;
    }
}

//Calculates the monthly usage of each coupon 
function getUsageData (coupons) {
    const monthlyUsage = Array(12).fill(0); 
    coupons.forEach(coupon => {
        coupon.used.at.forEach(date => {
            const month = new Date(date).getMonth()
            monthlyUsage[month] += 1
        });
    });
    
    return monthlyUsage;
};

//Validates a coupon by checking its code, expiry, usage limit, and updates usage
async function validateCoupon(couponCode) {
    try {
        let coupons = await storageService.query(STORAGE_KEY)
        const couponIdx = coupons.findIndex(c => c.code.toLowerCase() === couponCode.toLowerCase())

        if (couponIdx === -1) {
            console.log("Coupon not found!")
            return
        }

        const coupon = coupons[couponIdx]

        if(coupon.usedCount+1 > coupon.usageLimit){
            console.log("This coupon has reached usage limit")
            return
        }

        if(new Date(coupon.expiresAt) < new Date()) {
            console.log("Coupon expired!")
            return
        }

        coupon.used.count++
        coupon.used.at.push(new Date().toLocaleDateString())
        return await update(coupon)
    } catch(err) {
        console.log("Can't validate coupon", err);
        throw err
    }
}

//Removes a coupon from the storage by its ID
function remove(couponId) {
    try {
        return storageService.remove(STORAGE_KEY, couponId)
    } catch (err) {
        console.log("Can't remove coupon")
        throw err
    }
}

//Demo coupons
async function loadDemoCoupons() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(
        [
            {
                _id:utilService.makeId(),
                code: "SAVE20", 
                desc: "20% of all items",
                discount: { type: "percentage", value: 20 },
                expiresAt: new Date("2024-06-28T23:59:59"),
                stackable: true,
                usageLimit: 100,
                used: {at: [], count: 0},
                createdBy: {_id: "BXypEk", username: "Admin", at: new Date()}
            },
            {
                _id:utilService.makeId(),
                code: "SAVE50", 
                desc: "50 shekels of all items",
                discount: { type: "amount", value: 50 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: true,
                usageLimit: 100,
                used: {at: [], count: 0},
                createdBy: {_id: "BXypEk", username: "Admin",at: new Date("2024-02-28")}
            },
            {
                _id: utilService.makeId(),
                code: "SAVE15",
                desc: "15% off your order",
                discount: { type: "percentage", value: 15 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: true,
                usageLimit: 150,
                used: {at: [], count: 0},
                createdBy: { _id: "BXypEk", username: "Admin", at: new Date("2024-02-12")}
            },
            {
                _id: utilService.makeId(),
                code: "SAVE30",
                desc: "30 shekels off on purchases above 200₪",
                discount: { type: "amount", value: 30 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: true,
                usageLimit: 120,
                used: {at: [], count: 0},
                createdBy: { _id: "BXypEk", username: "Sahar", at: new Date("2024-04-12")}
            },
            {
                _id: utilService.makeId(),
                code: "SAVE40",
                desc: "40% off your entire order",
                discount: { type: "percentage", value: 40 },
                expiresAt: null,
                stackable: true,
                usageLimit: 80,
                used: {at: [], count: 0},
                createdBy: { _id: "BXypEk", username: "Admin", at: new Date() }
            },
            {
                _id: utilService.makeId(),
                code: "SAVE60",
                desc: "60 shekels off orders over 300₪",
                discount: { type: "amount", value: 60 },
                expiresAt: null,
                stackable: false,
                usageLimit: 50,
                used: {at: [], count: 0},
                createdBy: { _id: "BXypEk", username: "Sahar", at: new Date("2024-10-12")}
            },
            {
                _id: utilService.makeId(),
                code: "SAVE80",
                desc: "80% off for VIP members",
                discount: { type: "percentage", value: 80 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: false,
                usageLimit: 10,
                used: {at: [], count: 0},
                createdBy: { _id: "BXypEk", username: "Admin",at: new Date("2024-10-28")}
            },
            {
                _id: utilService.makeId(),
                code: "SAVE80",
                desc: "80% off for VIP members",
                discount: { type: "percentage", value: 80 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: false,
                usageLimit: 10,
                used: {at: [], count: 0},
                createdBy: { _id: "BXypEk", username: "Admin",at: new Date("2024-10-28")}
            }
            
        ]
))
    console.log('Demo coupons loaded')
}
 