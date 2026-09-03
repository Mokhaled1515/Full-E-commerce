export const DisplayPriceInRupees = (price)=>{
return new Intl.NumberFormat('en-EG',{
 style: 'currency',
 currency: 'EGP',

}).format(price)
}