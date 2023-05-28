type DefaultProps<T = any> = {
  children: import("react").ReactNode;
} & T;

type InitUserAccount = {
  id: string,
  username: string,
  externalId: string,
  emailAddress: Array<string>,
  firstName: string,
  lastName: string,
  password: string,
  publicMetadata: {
      kudos: number,
      isBlocked: boolean,
      isSuspended: boolean,
      isEmailPublic: boolean,
      bio: string,
      displayPictureSrc: string,
      dateJoined: Date,
      isSuperUser: boolean,
      isVerified: boolean
  },
  privateMetadata: {
      legacyPermissions: string
  },
  unsafeMetadata: {
      notifyOnPosts: boolean,
      notifyOnReview: boolean,
      notifyOnFlagged: boolean
  }
}