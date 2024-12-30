export interface PricingPlan {
  id: number;
  points: number;
  price: number;
  originalPrice: number;
  qrcodeUrl: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    points: 100,
    price: 9.9,
    originalPrice: 10,
    qrcodeUrl: "wxp://f2f1CE00p8EDXcwQ0sNXJ4B4NhLwan-PQfqvUcLam1TXn3PDUcneIhbiwPketiPH5PDH"
  },
  {
    id: 2,
    points: 200,
    price: 19,
    originalPrice: 20,
    qrcodeUrl: "wxp://f2f18N3yGRIm0lS0hxtXbhnjZoB_hDDTsBUuCWry2LQ4k6SvWAroWwAJIJXwbo76UCgj"
  },
  {
    id: 3,
    points: 400,
    price: 36,
    originalPrice: 40,
    qrcodeUrl: "wxp://f2f1HhxjT8TqjQ5Yf_vhu5GTFgsmAn4T221xqAHYXcEUvgQpHOCQ9uyddLbCDbLJOlJ3"
  },
  {
    id: 4,
    points: 800,
    price: 68,
    originalPrice: 80,
    qrcodeUrl: "wxp://f2f1AZklyV0WImhHjs1OxTVYzBaBRfNcUbfMmOQzeVZQnEaff-ysFi8Ewv6ruJ-mxZT6"
  },
  {
    id: 5,
    points: 1600,
    price: 128,
    originalPrice: 160,
    qrcodeUrl: "wxp://f2f1boBBnoox0GUU5_aMHaY3XXa8ulSXQES9jsTVRtWrzeybX_FCz3XMVseVNh33lZSQ"
  }
]; 