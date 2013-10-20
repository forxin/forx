module ApplicationHelper
  def foo_pluralize(count, singular, plural)
    count == 1 ? singular : plural
  end

  # Public: Convert flash type (Rails) to either one of the available bootstrap
  # alert class names.
  #
  # flash_type - Flash type String (Rails).
  #
  # Returns bootstrap class String.
  def bootstrap_class_for flash_type
    case flash_type
    when :success
      "alert-success"
    when :error
      "alert-error"
    when :alert
      "alert-warning"
    when :notice
      "alert-info"
    else
      flash_type.to_s
    end
  end
end
