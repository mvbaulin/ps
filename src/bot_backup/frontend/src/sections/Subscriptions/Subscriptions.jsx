import Section from "../../components/Section/Section";
import SubscriptionButton from "../../components/SubscriptionButton/SubscriptionButton";
import classes from "./Subscriptions.module.css";

const Subscriptions = () => {
  return (
    <Section title="Подписки">

      <div className={`${classes.card} ${classes.ps}`}>
        <img
          className="img"
          src="/logos/ps_plus.svg"
          width="180"
          height="37.73"
        />
      </div>

      <div className={`${classes.card} ${classes.ubisoft}`}>
        <div className={classes.wrapper_single}>
          <img
            className="img"
            src="/logos/ubisoft.svg"
            width="107"
            height="20"
          />
        </div>
        <div className={classes.wrapper_single}>
          <SubscriptionButton
            url="#"
            price="1000"
            months="1"
            discount="800"
            type="ubisoft"
          />
        </div>
      </div>

      <div className={`${classes.card} ${classes.gta}`}>
        <div className={classes.wrapper_single}>
          <img
            className="img"
            src="/logos/gta_plus.svg"
            width="79"
            height="56"
          />
        </div>

        <div className={classes.wrapper_single}>
          <SubscriptionButton
            url="#"
            price="1000"
            months="1"
            discount="80"
            type="gta"
          />
        </div>
      </div>

      <div className={`${classes.card} ${classes.ea}`}>
        <img
          className="img"
          src="/logos/ea.svg"
          width="117"
          height="40"
        />

        <div className={classes.wrapper_double}>
          <div className={classes.wrapper_single}>
            <SubscriptionButton
              url="#"
              price="1000"
              months="1"
              discount="80"
              type="ea"
            />
          </div>

          <div className={classes.wrapper_single}>
            <SubscriptionButton
              url="#"
              price="1000"
              months="1"
              discount="80"
              type="ea"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Subscriptions;
