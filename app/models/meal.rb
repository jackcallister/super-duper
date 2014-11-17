class Meal < ActiveRecord::Base
  validate :name, presence: true
end
