/**
 * 공통 폼 필드 컴포넌트
 *
 * 디자인 의사결정:
 * - 일관된 폼 필드 UI 패턴
 * - 에러 상태 표시
 * - 접근성 고려
 * - 재사용 가능한 필드 구조
 */

import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BaseFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  helperText?: string;
  showCharCount?: boolean;
  currentLength?: number;
  maxLength?: number;
}

function BaseField({
  id,
  label,
  error,
  required = false,
  disabled = false,
  className,
  children,
  helperText,
  showCharCount = false,
  currentLength = 0,
  maxLength
}: BaseFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={id}
        className={cn(
          required && "after:content-['*'] after:ml-1 after:text-red-500"
        )}
      >
        {label}
      </Label>
      {children}
      <div className="flex justify-between items-center">
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        ) : (
          <div />
        )}
        {showCharCount && maxLength && (
          <p className="text-sm text-muted-foreground">
            {currentLength}/{maxLength}자
          </p>
        )}
      </div>
    </div>
  );
}

// Input 필드
interface InputFieldProps extends Omit<BaseFieldProps, "children"> {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function InputField({
  id,
  label,
  error,
  required = false,
  disabled = false,
  className,
  type = "text",
  placeholder,
  value,
  onChange,
  min,
  max,
  step,
  helperText,
  showCharCount = false,
  currentLength = 0,
  maxLength
}: InputFieldProps) {
  return (
    <BaseField
      id={id}
      label={label}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
      helperText={helperText}
      showCharCount={showCharCount}
      currentLength={currentLength}
      maxLength={maxLength}
    >
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(error && "border-red-500")}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
      />
    </BaseField>
  );
}

// Textarea 필드
interface TextareaFieldProps extends Omit<BaseFieldProps, "children"> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
}

export function TextareaField({
  id,
  label,
  error,
  required = false,
  disabled = false,
  className,
  placeholder,
  value,
  onChange,
  rows = 4,
  helperText,
  showCharCount = false,
  currentLength = 0,
  maxLength
}: TextareaFieldProps) {
  return (
    <BaseField
      id={id}
      label={label}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
      helperText={helperText}
      showCharCount={showCharCount}
      currentLength={currentLength}
      maxLength={maxLength}
    >
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(error && "border-red-500")}
        rows={rows}
        maxLength={maxLength}
      />
    </BaseField>
  );
}

// Select 필드
interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<BaseFieldProps, "children"> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
}

export function SelectField({
  id,
  label,
  error,
  required = false,
  disabled = false,
  className,
  placeholder,
  value,
  onChange,
  options,
  helperText
}: SelectFieldProps) {
  return (
    <BaseField
      id={id}
      label={label}
      error={error}
      required={required}
      disabled={disabled}
      className={className}
      helperText={helperText}
    >
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={cn(error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </BaseField>
  );
}
