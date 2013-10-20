module ApplicationHelper
  def foo_pluralize(count, singular, plural)
    count == 1 ? singular : plural
  end
end
