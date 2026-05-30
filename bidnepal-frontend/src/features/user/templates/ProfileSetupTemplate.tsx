import Text from "@/shared/components/ui/atoms/Text/Text.component"
import ProfileUpdateForm from "../components/ProfileUpdateForm"

const ProfileSetupTemplate = () => {

  return (
     <section className="flex justify-center px-5 py-16 md:px-16">
      <div className="bg-card w-[90vw] max-w-150 rounded-xl py-8 px-6">
        <div className="mb-4">
          <Text variant="heading">Profile Setup</Text>
          <Text variant="muted">Please Complete your profile to continue</Text>
        </div>

       <ProfileUpdateForm/>

      </div>
    </section>
  )
}

export default ProfileSetupTemplate
