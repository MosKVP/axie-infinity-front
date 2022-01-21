interface Props {
  header: string;
  body: string;
}

export const Message: React.FC<Props> = ({ header, body }) => {
  return (
    <div className='message'>
      <div className='message__header'>{header}</div>
      <div className='message__body'>{body}</div>
    </div>
  );
};
