import { storageService } from "./async-storage.service"
import { utilService } from "./util.services"

const STORAGE_KEY = 'couponDB'

export const couponService = {
    getCoupons,
    remove,
    add,
    update,
    validateCoupon
}

async function add(coupon) {
    try {
        const res = await storageService.post(STORAGE_KEY, coupon)
        return res 
    } catch (err) {
        console.error('Failed to add coupon:', err)
        throw err
    }
}

async function update(coupon) {
    try {
        return await storageService.put(STORAGE_KEY, coupon)    
    } catch (err) {
        console.log("can't update coupon", err)
        throw err
    }
}

async function getCoupons() {
    try {

        let coupons = await storageService.query(STORAGE_KEY)
        console.log(coupons);
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

        coupon.usedCount++
        return await update(coupon)
    } catch(err) {
        console.log("Can't validate coupon", err);
        throw err
    }
}

function remove(couponId) {
    try {

        return storageService.remove(STORAGE_KEY, couponId)
    } catch (err) {
        console.log("Can't remove coupon")
        throw err
    }
}


async function loadDemoCoupons() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(
        [
            {
                _id:utilService.makeId(),
                code: "SAVE20", 
                desc: "20% of all items",
                discount: { type: "percentage", value: 20 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: true,
                usageLimit: 100,
                usedCount: 0,
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
                usedCount: 0,
                createdBy: {_id: "BXypEk", username: "Admin",at: new Date()}
            },
            {
                _id: utilService.makeId(),
                code: "SAVE15",
                desc: "15% off your order",
                discount: { type: "percentage", value: 15 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: true,
                usageLimit: 150,
                usedCount: 0,
                createdBy: { _id: "BXypEk", username: "Admin", at: new Date() }
            },
            {
                _id: utilService.makeId(),
                code: "SAVE30",
                desc: "30 shekels off on purchases above 200₪",
                discount: { type: "amount", value: 30 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: true,
                usageLimit: 120,
                usedCount: 0,
                createdBy: { _id: "BXypEk", username: "Admin", at: new Date() }
            },
            {
                _id: utilService.makeId(),
                code: "SAVE40",
                desc: "40% off your entire order",
                discount: { type: "percentage", value: 40 },
                expiresAt: null,
                stackable: true,
                usageLimit: 80,
                usedCount: 0,
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
                usedCount: 0,
                createdBy: { _id: "BXypEk", username: "Admin", at: new Date() }
            },
            {
                _id: utilService.makeId(),
                code: "SAVE80",
                desc: "80% off for VIP members",
                discount: { type: "percentage", value: 80 },
                expiresAt: new Date("2024-12-31T23:59:59"),
                stackable: false,
                usageLimit: 10,
                usedCount: 0,
                createdBy: { _id: "BXypEk", username: "Admin", at: new Date() }
            }
        ]
))
    console.log('Demo coupons loaded')
}
 