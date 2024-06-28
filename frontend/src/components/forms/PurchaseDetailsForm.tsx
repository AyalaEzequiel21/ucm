import { IPurchaseDetails } from "@/utils/interfaces/IPurchase";
import { useForm } from "react-hook-form";

interface PurchaseDetailsProps {
    onAddDetail: (detail: IPurchaseDetails) => void
}

const PurchaseDetailsForm: React.FC<PurchaseDetailsProps> = ({onAddDetail}) => {

    const methods = useForm<IPurchaseDetails>({
        defaultValues: {
            product_name: '',
            quantity: 1,
            unity_price: 0,
          }
    })

    const {
        handleSubmit,
        reset,
        formState: { errors },
      } = methods

      const onSubmit = (data: IPurchaseDetail) => {
        if (data.product_name && data.quantity > 0 && data.unity_price > 0) {
          onAddDetail(data);
          reset();
        }
      }

    return (

    )
}