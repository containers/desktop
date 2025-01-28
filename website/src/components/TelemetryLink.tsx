import Link from '@docusaurus/Link';

type TelemetryLinkProps = {
  href: string;
  eventTitle: string;
  className: string;
  children?: JSX.Element;
};

const sendGoatCounterEvent = (title: string): void => {
  window.goatcounter.count({
    // path is set by default
    title: title,
    event: true,
  });
};

export const TelemetryLink = (props: TelemetryLinkProps): JSX.Element => {
  return (
    <Link
      className={props.className}
      to={props.href}
      onClick={() => {
        sendGoatCounterEvent(props.eventTitle);
      }}>
      {props.children}
    </Link>
  );
};
