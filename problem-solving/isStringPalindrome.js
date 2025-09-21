function isStringPalindrome(string){
 string = string.toLowerCase().replace(/[^a-z0-9]/g, ''); 
 let reservedString = string.split('').reverse().join('');
 return string === reservedString;
}