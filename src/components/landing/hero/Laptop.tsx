import { Box } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { scrollbarStyle } from '../../dashboard/shared/styles';
import { MessageListItem } from './MessageListItem';
import { CustomCanvas } from './Model';

export const Laptop = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesEndRef: any = useRef();

  const messages = [
    {
      author: 'Janek',
      message: 'Kiedy kolos z matematyki?',
    },
    {
      author: 'Anna',
      message: 'Do kiedy projekt z fizyki?',
    },
    {
      author: 'Kuba',
      message: 'Kiedy egzamin z angielskiego?',
    },
    {
      author: 'Marcin',
      message: 'ABC?',
    },
    {
      author: 'Kasia',
      message: 'ABC?',
    },
    {
      author: 'Tomek',
      message: 'ABC?',
    },
    {
      author: 'Błażej',
      message: 'ABC?',
    },
    {
      author: 'Kinga',
      message: 'ABC?',
    },
    {
      author: 'Julia',
      message: 'ABC?',
    },
  ];

  useEffect(() => {
    const addMessageInterval = setInterval(() => {
      setCurrentIndex((index) => index + 1);
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
      <Box backgroundColor={'#2D3748'} style={{ width: 334, height: 216, padding: 3 }}>
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
          {messages.map((message: any, index) => {
            if (index < currentIndex) {
              return (
                <MessageListItem
                  key={message.message + message.author}
                  message={message.message}
                  author={message.author}
                  scrollFunction={scrollMessages}
                />
              );
            }
          })}
        </Box>
      </Box>
    </CustomCanvas>
  );
};
