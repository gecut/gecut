import { Content } from '#hami/content';
import i18n from '#hami/ui/i18n';

export function getByErrorCode(errorCode: string): string {
  if (Object.keys(Content.apiServerErrorMessage).includes(errorCode) === true) {
    return Content.apiServerErrorMessage[
      errorCode as keyof typeof Content.apiServerErrorMessage
    ];
  }

  return i18n.message('error_in_connection_to_server');
}
