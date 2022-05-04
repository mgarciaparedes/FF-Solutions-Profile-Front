import React from 'react'
import PasswordChecklist from "react-password-checklist"

const PasswordCheckList = ( {password, passwordAgain} ) => {
  return (
    <>
        <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={password}
				valueAgain={passwordAgain}
				onChange={(isValid) => {}}
			/>
    </>
  )
}

export default PasswordCheckList