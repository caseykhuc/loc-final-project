import { useEffect } from 'react';
import isURL from 'validator/lib/isURL';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@ahaui/react';
import { modalSelector } from 'redux/reducers/modal';
import { useAppSelector } from 'hooks';
import { isEmpty } from 'utils/library';
import { TABLE_ITEM_NAME_REGEX } from 'constants/validation';
import { IFormCategoryInputs } from 'types/form';
import { InlineError } from 'components/Common';
import { CategoryPayload } from 'types/category';

type CreateFormProps = {
  submitHandle: (data: IFormCategoryInputs) => void;
  closeHandle: () => void;
  initValue?: CategoryPayload;
};

const CategoryCreateForm: React.FC<CreateFormProps> = ({
  submitHandle,
  closeHandle,
  initValue,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setFocus,
  } = useForm<IFormCategoryInputs>({
    mode: 'onChange',
    defaultValues: initValue
      ? {
        name: initValue.name,
        imageUrl: initValue.imageUrl,
      }
      : {},
  });
  const { isLoading } = useAppSelector(modalSelector);

  useEffect(() => {
    setTimeout(() => {
      setFocus('name');
    }, 100);
  }, [setFocus]);

  return (
    <Form>
      <div className="u-paddingMedium">
        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Name"
            {...register('name', {
              maxLength: {
                value: 255,
                message: 'Maximum length of name is 255 character',
              },
              validate: {
                isEmpty: (value: string) => isEmpty(value) || 'Please enter your category name',
              },
              pattern: {
                value: TABLE_ITEM_NAME_REGEX,
                message: 'Website only supports English. ',
              },
            })}
          />

          {errors.name && <InlineError>{errors.name.message}</InlineError>}
        </Form.Group>

        {/* Example input */}

        <Form.Group sizeControl="large">
          <Form.Input
            type="text"
            placeholder="Image Url"
            {...register('imageUrl', {
              maxLength: {
                value: 200,
                message: 'Maximum length of image URL is 200 characters',
              },

              validate: {
                isURL: (value: string | undefined) =>
                  value && (isURL(value) || 'Please enter a valid URL'),
              },
            })}
          />
          {errors.imageUrl && <InlineError>{errors.imageUrl.message}</InlineError>}
        </Form.Group>
      </div>
      <div className="u-backgroundLightest u-paddingMedium u-flex u-alignItemsCenter u-justifyContentEnd u-roundedLarge">
        <Button
          className="u-marginRightSmall"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            closeHandle();
          }}
          width="full"
          type="button"
        >
          Close
        </Button>

        <Button
          width="full"
          variant="primary"
          onClick={handleSubmit(submitHandle)}
          disabled={isLoading || !isValid || !isDirty}
          type="submit"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </Form>
  );
};

export default CategoryCreateForm;
