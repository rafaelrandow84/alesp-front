import { Text, ITextProps } from "native-base"
import { ReactNode } from "react"

interface TituloProps extends ITextProps {
  children: ReactNode
}

export function Titulo({ children, ...rest }: TituloProps){
  return (
    <Text
        mt={5}
        fontSize="lg"
        fontWeight="bold"
        color="gray.500"
        textAlign="center"
        {...rest}
      >
        {children}
      </Text>
  )
}