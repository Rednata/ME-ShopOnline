const getNameDays = (days) => {
  if (days % 10 === 1 && days !== 11) {
    return 'день';
  } else if ((days % 10 === 2 ||
                days % 10 === 3 ||
                days % 10 === 4) &&
                (days <= 5 || days >= 20)) {
    return 'дня';
  } else {
    return 'дней';
  }
};

const getNameHours = (hours) => {
  if (hours === 1 ||
      hours === 21) {
    return 'час';
  } else if ((hours >= 5 && hours <= 20) ||
              hours % 10 === 0) {
    return 'часов';
  } else {
    return 'часа';
  }
};

const getNameMinutes = (minutes) => {
  if (minutes % 10 === 1 &&
      minutes !== 11) {
    return 'минута';
  } else if ((minutes % 10 === 2 ||
                  minutes % 10 === 3 ||
                  minutes % 10 === 4) &&
                (minutes <= 5 || minutes >= 20)) {
    return 'минуты';
  } else {
    return 'минут';
  }
};

const getNameSeconds = (seconds) => {
  if (seconds % 10 === 1 &&
      seconds !== 11) {
    return 'секунда';
  } else if ((seconds % 10 === 2 ||
                  seconds % 10 === 3 ||
                  seconds % 10 === 4) &&
                (seconds <= 5 || seconds >= 20)) {
    return 'секунды';
  } else {
    return 'секунд';
  }
};

export {getNameDays, getNameHours, getNameMinutes, getNameSeconds};
