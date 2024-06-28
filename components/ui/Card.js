const Card = ({ className, children }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardHeader = ({ className, children }) => (
  <div className={`card-header flex items-center ${className}`}>{children}</div>
);

const CardBody = ({ className, children }) => (
  <div className={`card-body ${className}`}>{children}</div>
);

const CardFooter = ({ className, children }) => (
  <div className={`card-footer ${className}`}>{children}</div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
