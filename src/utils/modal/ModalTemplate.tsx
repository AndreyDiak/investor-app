import { CloseButton } from "../../components/common/CloseButton/CloseButton";

interface Props {
   title: string;
   children: React.ReactNode
}

// TODO: возможно есть готовая npm библиотека с модалками
// установить ее и сделать кастомный сервис по возможности

// TODO: узнать может ли помочь lodash для вычислений 
// чтобы избавится от конструкции Number(ToFixed());

// TODO:  сделать общую модалку для покупки и продажи акций

// TODO: реализовать покупку акций

export const ModalTemplate = ({ title, children }: Props) => {
   return (
      <div>
         <div>
            {title}
         </div>
         <div>
            <CloseButton handler={() => { }} />
         </div>
         {children}
      </div>
   )
}