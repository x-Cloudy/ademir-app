import { Notify } from "quasar";

enum Options { positive, negative }
type Opt = keyof typeof Options

type NotifyType = {
  type: Opt;
  msg: string;
}

const notify = ({ type, msg }: NotifyType) => {
  Notify.create({
    type: type,
    message: msg,
    position: 'top',
    color: type === 'positive' ? 'green' : 'red'
  })
}

export default notify