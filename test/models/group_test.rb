# == Schema Information
#
# Table name: groups
#
#  id             :integer          not null, primary key
#  organizer_id   :integer          not null
#  title          :string           not null
#  description    :text             not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  filepicker_url :string
#

require 'test_helper'

class GroupTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
