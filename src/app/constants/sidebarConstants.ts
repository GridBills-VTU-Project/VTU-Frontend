import ph from '../../../public/fluent_phone-24-regular.png'
import wifi from '../../../public/streamline-logos_rss-feed-logo-solid.png'
import electric from '../../../public/healthicons_electricity.png'
import tv from '../../../public/solar_tv-bold.png'
import card from '../../../public/ion_card-sharp.png'
// import  from '../../../../public/fluent_phone-24-regular.png'

export const sidebarLinks = [
  { name: "Buy Phone Airtime", img: ph, href: "/buy-airtime",color:"bg-[#1601FF4D]" },
  { name: "Buy Internet Data", img: wifi, href: "/buy-wifi",color:"bg-[#2EAF074D]" },
  { name: "Pay Electricity Bill", img: electric, href: "/buy-airtime",color:"bg-[#F761164D]" },
  { name: "Pay TV Subscription", img: tv, href: "/buy-airtime",color:"bg-[#1631454D]" },
  { name: "Exam Scratch card", img: card, href: "/buy-airtime",color:"bg-[#1631454D]" }
]
export const quickActions = [
  { query: "airtime",name: "Buy Airtime", img: ph, href: "/buy-airtime"},
  { query: "data",name: "Buy Internet Data", img: wifi, href: "/buy-wifi"},
  { query: "bill",name: "Pay Electricity Bill", img: electric, href: "/buy-airtime"},
  { query: "card",name: "Exam Scratch card", img: card, href: "/buy-airtime"},
  { query: "subscription",name: "Pay TV Subscription", img: tv, href: "/buy-airtime"},
  { query: "pin",name: "Buy Card Pin", img: tv, href: "/buy-airtime"}
]
export const transactions = [
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph },
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph},
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph},
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph },
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph },
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph},
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph},
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph },
  { name: "airtime", sp:"mtn", time:"Today, 10:50am", amount:"500", img: ph }
]