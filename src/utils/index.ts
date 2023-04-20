
export const encryptNumber = async (phoneNumber: string): Promise<string> => {
    const mapping: {
      [key: string]: string;
      '0': string;
      '1': string;
      '2': string;
      '3': string;
      '4': string;
      '5': string;
      '6': string;
      '7': string;
      '8': string;
      '9': string;
      '+': string;
      '-': string;
      '(': string;
      ')': string;
      ' ': string;
    } = {
      '0': 'x',
      '1': 'b',
      '2': 'z',
      '3': 'n',
      '4': 'm',
      '5': 'p',
      '6': 'a',
      '7': 's',
      '8': 'd',
      '9': 'f',
      '+': 't',
      '-': 'u',
      '(': 'q',
      ')': 'w',
      ' ': 'e',
    };
    let encrypted = '';
    for (let i = 0; i < phoneNumber.length; i++) {
      const char = phoneNumber[i];
      if (char in mapping) {
        encrypted += mapping[char];
      } else {
        encrypted += char;
      }
    }
    return encrypted;
  };
export const placeholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcrp83BUBNmqMskS8X3XpXQq8-a_BZ6RDCL7meR3w-zMSqrtM5ZJFyChGokStk50j_S0&usqp=CAU'
