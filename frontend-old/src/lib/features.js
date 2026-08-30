export const getOrSaveLocalStorage = ({key , value , get}) => {
    if(get){
        return localStorage.getItem(key)?JSON.parse(localStorage.getItem(key)) : null
    }else{
        localStorage.setItem(key,JSON.stringify(value));
    }
}