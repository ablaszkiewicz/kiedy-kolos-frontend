import { Box } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { scrollbarStyle } from '../../dashboard/shared/styles';
import { MessageListItem } from './MessageListItem';
import { CustomCanvas } from './Model';

export const Laptop = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesEndRef: any = useRef();

  const authors = [
    'Janek',
    'Ala',
    'Kasia',
    'Julia',
    'Bartek',
    'Jurek',
    'Dominik',
    'Maciek',
    'Patryk',
    'Kuba',
    'Michał',
    'Zuzia',
    'Kinga',
  ];

  const messages = [
    'Kiedy jest kolos z',
    'Kiedy egzamin z',
    'Kiedy projekt z',
    'Kiedy labki z ',
    'Jaki jest termin projektu z',
    'Do kiedy trzeba wysłać projekt z',
    'Na kiedy jest praca domowa z',
    'Kiedy są dodatkowe zajęcia z',
    'Kieda są dodatkowe konsultacje z',
  ];

  const subjects = [
    'Matematyki',
    'Angielskiego',
    'Fizyki',
    'Informatyki',
    'Niemieckiego',
    'Chemii',
    'Ekonomii',
    'Psychologii',
  ];

  const [messagesShown, setMessagesShown] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setMessagesShown((old) => [
        ...old,
        {
          author: authors[Math.floor(Math.random() * authors.length)],
          message: `${messages[Math.floor(Math.random() * messages.length)]} ${
            subjects[Math.floor(Math.random() * subjects.length)]
          }?`,
        },
      ]);
    }, 1000);

    const addMessageInterval = setInterval(() => {
      setMessagesShown((old) => [
        ...old,
        {
          author: authors[Math.floor(Math.random() * authors.length)],
          message: `${messages[Math.floor(Math.random() * messages.length)]} ${
            subjects[Math.floor(Math.random() * subjects.length)]
          }?`,
        },
      ]);
    }, 2500);

    return () => clearInterval(addMessageInterval);
  }, []);

  const scrollMessages = () => {
    messagesEndRef.current.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <CustomCanvas>
      <Box backgroundColor={'#171923'} style={{ width: 334, height: 216 }}>
        <Box
          backgroundColor={'#171923'}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            overflowY: 'scroll',
          }}
          css={scrollbarStyle}
          ref={messagesEndRef}
        >
          {messagesShown &&
            messagesShown.map((message: any, index) => (
              <MessageListItem
                key={message.message + message.author}
                message={message.message}
                author={message.author}
                scrollFunction={scrollMessages}
              />
            ))}
        </Box>
      </Box>
    </CustomCanvas>
  );
};
